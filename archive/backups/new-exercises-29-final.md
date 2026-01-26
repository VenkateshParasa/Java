# Final Part: Completing Day 29 - Multithreading
# Exercises 4-7: Synchronization and Thread Safety

---

#### Exercise 4: Synchronization Basics (25 minutes)

**What you'll learn:** Understanding and implementing thread synchronization

**Create class: `SynchronizationDemo`**

**Concept:** **Synchronization** prevents multiple threads from accessing shared resources simultaneously, avoiding race conditions and data inconsistency.

```
Problem: Race Condition
Thread1: read value (100)
Thread2: read value (100)
Thread1: add 10 → 110
Thread2: add 20 → 120
Thread1: write 110
Thread2: write 120 (Lost Thread1's update!)

Solution: Synchronized
Only one thread can execute synchronized block at a time
Thread1: lock → read → add → write → unlock
Thread2: (waits) → lock → read → add → write → unlock
```

**Step-by-Step:**

```java
// Class WITHOUT synchronization (demonstrates problem)
class Counter {
    private int count = 0;

    public void increment() {
        count++; // NOT thread-safe (read-modify-write)
    }

    public int getCount() {
        return count;
    }
}

// Class WITH synchronization (synchronized method)
class SynchronizedCounter {
    private int count = 0;

    public synchronized void increment() {
        count++; // Thread-safe now
    }

    public synchronized int getCount() {
        return count;
    }
}

// Class using synchronized block
class BankAccount {
    private double balance = 1000;

    public void withdraw(double amount) {
        synchronized (this) { // Synchronized block
            if (balance >= amount) {
                System.out.println(Thread.currentThread().getName() +
                                 " withdrawing $" + amount);
                try {
                    Thread.sleep(100); // Simulate processing
                } catch (InterruptedException e) {}

                balance -= amount;
                System.out.println(Thread.currentThread().getName() +
                                 " withdrew $" + amount +
                                 ", Balance: $" + balance);
            } else {
                System.out.println(Thread.currentThread().getName() +
                                 " failed - Insufficient funds");
            }
        }
    }

    public synchronized double getBalance() {
        return balance;
    }
}

public class SynchronizationDemo {

    public static void main(String[] args) {
        System.out.println("===== SYNCHRONIZATION BASICS =====\n");

        // Part 1: Demonstrate race condition (WITHOUT sync)
        System.out.println("--- Part 1: Race Condition (No Sync) ---");

        Counter unsafeCounter = new Counter();

        // Create 10 threads that increment 1000 times each
        Thread[] threads = new Thread[10];
        for (int i = 0; i < 10; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    unsafeCounter.increment();
                }
            });
            threads[i].start();
        }

        // Wait for all threads
        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {}
        }

        System.out.println("Expected count: " + (10 * 1000));
        System.out.println("Actual count: " + unsafeCounter.getCount());
        System.out.println("Lost updates due to race condition!");

        // Part 2: Fixed with synchronization
        System.out.println("\n--- Part 2: With Synchronization ---");

        SynchronizedCounter safeCounter = new SynchronizedCounter();

        // Create 10 threads that increment 1000 times each
        Thread[] threads2 = new Thread[10];
        for (int i = 0; i < 10; i++) {
            threads2[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    safeCounter.increment();
                }
            });
            threads2[i].start();
        }

        // Wait for all threads
        for (Thread thread : threads2) {
            try {
                thread.join();
            } catch (InterruptedException e) {}
        }

        System.out.println("Expected count: " + (10 * 1000));
        System.out.println("Actual count: " + safeCounter.getCount());
        System.out.println("Correct! Synchronization prevented race condition.");

        // Part 3: Synchronized block example
        System.out.println("\n--- Part 3: Bank Account (Synchronized Block) ---");

        BankAccount account = new BankAccount();
        System.out.println("Initial balance: $" + account.getBalance());

        // Multiple threads trying to withdraw
        Thread t1 = new Thread(() -> account.withdraw(600), "Person-1");
        Thread t2 = new Thread(() -> account.withdraw(500), "Person-2");
        Thread t3 = new Thread(() -> account.withdraw(400), "Person-3");

        t1.start();
        t2.start();
        t3.start();

        try {
            t1.join();
            t2.join();
            t3.join();
        } catch (InterruptedException e) {}

        System.out.println("Final balance: $" + account.getBalance());

        // Part 4: Static synchronization
        System.out.println("\n--- Part 4: Static Synchronization ---");

        Thread st1 = new Thread(() -> StaticCounter.increment(), "Static-1");
        Thread st2 = new Thread(() -> StaticCounter.increment(), "Static-2");

        st1.start();
        st2.start();

        try {
            st1.join();
            st2.join();
        } catch (InterruptedException e) {}

        System.out.println("Static counter: " + StaticCounter.getCount());

        System.out.println("\n==================================");
    }
}

// Static synchronization example
class StaticCounter {
    private static int count = 0;

    public static synchronized void increment() {
        for (int i = 0; i < 5; i++) {
            count++;
            System.out.println(Thread.currentThread().getName() +
                             " incremented to: " + count);
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {}
        }
    }

    public static synchronized int getCount() {
        return count;
    }
}
```

**Expected Output:**
```
===== SYNCHRONIZATION BASICS =====

--- Part 1: Race Condition (No Sync) ---
Expected count: 10000
Actual count: 9847
Lost updates due to race condition!

--- Part 2: With Synchronization ---
Expected count: 10000
Actual count: 10000
Correct! Synchronization prevented race condition.

--- Part 3: Bank Account (Synchronized Block) ---
Initial balance: $1000.0
Person-1 withdrawing $600.0
Person-1 withdrew $600.0, Balance: $400.0
Person-2 failed - Insufficient funds
Person-3 withdrawing $400.0
Person-3 withdrew $400.0, Balance: $0.0
Final balance: $0.0

--- Part 4: Static Synchronization ---
Static-1 incremented to: 1
Static-1 incremented to: 2
Static-1 incremented to: 3
Static-1 incremented to: 4
Static-1 incremented to: 5
Static-2 incremented to: 6
Static-2 incremented to: 7
Static-2 incremented to: 8
Static-2 incremented to: 9
Static-2 incremented to: 10
Static counter: 10

==================================
```

**💡 Synchronization Types:**

```java
// 1. Synchronized method (instance)
public synchronized void method() {
    // Only one thread can execute this at a time
    // Lock: this object
}

// 2. Synchronized block (instance)
public void method() {
    synchronized(this) {
        // Critical section
        // Lock: this object
    }
}

// 3. Synchronized method (static)
public static synchronized void method() {
    // Only one thread per class
    // Lock: Class object
}

// 4. Synchronized block (custom lock)
private final Object lock = new Object();
public void method() {
    synchronized(lock) {
        // Critical section
        // Lock: custom lock object
    }
}
```

**✅ Success Criteria:**
- Understand race conditions
- Can identify when synchronization is needed
- Know difference between synchronized method and block
- Understand static synchronization
- Can prevent data inconsistency

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Synchronizing on null | NullPointerException | Ensure lock object is initialized |
| Over-synchronization | Performance bottleneck | Synchronize only critical sections |
| Synchronizing on String literal | Shared across JVM | Use dedicated lock object |
| Nested locks in different order | Deadlock risk | Always acquire locks in same order |

**🎯 Challenge:**
1. Fix race condition in shared list
2. Implement thread-safe singleton pattern
3. Create synchronized queue
4. Build thread-safe cache
5. Prevent deadlock in bank transfer system

---

#### Exercise 5: Thread Safety Patterns (25 minutes)

**What you'll learn:** Common thread safety patterns and best practices

**Create class: `ThreadSafetyPatterns`**

**Concept:** **Thread Safety** means code that works correctly when accessed by multiple threads simultaneously. Various patterns ensure thread safety.

**Step-by-Step:**

```java
import java.util.*;
import java.util.concurrent.*;

// Pattern 1: Immutable objects (inherently thread-safe)
final class ImmutablePerson {
    private final String name;
    private final int age;

    public ImmutablePerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    // No setters - object cannot be modified after creation
}

// Pattern 2: Thread-local storage
class ThreadLocalExample {
    private static ThreadLocal<Integer> threadId = ThreadLocal.withInitial(() -> 0);

    public static void setThreadId(int id) {
        threadId.set(id);
    }

    public static int getThreadId() {
        return threadId.get();
    }
}

// Pattern 3: Synchronized collections
class SynchronizedCollectionExample {
    public static void demonstrateSyncCollection() {
        // Thread-safe list
        List<String> syncList = Collections.synchronizedList(new ArrayList<>());

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 100; i++) {
                syncList.add("T1-" + i);
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 100; i++) {
                syncList.add("T2-" + i);
            }
        });

        t1.start();
        t2.start();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {}

        System.out.println("Sync list size: " + syncList.size());
    }
}

// Pattern 4: Concurrent collections (better performance)
class ConcurrentCollectionExample {
    public static void demonstrateConcurrentCollection() {
        // Thread-safe without locking entire collection
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 100; i++) {
                map.put("T1-" + i, i);
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 100; i++) {
                map.put("T2-" + i, i);
            }
        });

        t1.start();
        t2.start();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {}

        System.out.println("Concurrent map size: " + map.size());
    }
}

// Pattern 5: Double-checked locking (Singleton)
class ThreadSafeSingleton {
    private static volatile ThreadSafeSingleton instance;

    private ThreadSafeSingleton() {
        System.out.println("Singleton created");
    }

    public static ThreadSafeSingleton getInstance() {
        if (instance == null) { // First check (no locking)
            synchronized (ThreadSafeSingleton.class) {
                if (instance == null) { // Second check (with locking)
                    instance = new ThreadSafeSingleton();
                }
            }
        }
        return instance;
    }
}

// Pattern 6: Atomic variables
class AtomicExample {
    private final java.util.concurrent.atomic.AtomicInteger counter =
        new java.util.concurrent.atomic.AtomicInteger(0);

    public void increment() {
        counter.incrementAndGet(); // Thread-safe without synchronization
    }

    public int getCount() {
        return counter.get();
    }
}

public class ThreadSafetyPatterns {
    public static void main(String[] args) {
        System.out.println("===== THREAD SAFETY PATTERNS =====\n");

        // Pattern 1: Immutable objects
        System.out.println("--- Pattern 1: Immutable Objects ---");
        ImmutablePerson person = new ImmutablePerson("John", 30);
        System.out.println("Immutable person: " + person.getName() +
                         ", " + person.getAge());
        System.out.println("Thread-safe because immutable!");

        // Pattern 2: Thread-local
        System.out.println("\n--- Pattern 2: Thread-Local Storage ---");

        Thread tl1 = new Thread(() -> {
            ThreadLocalExample.setThreadId(1);
            System.out.println("Thread 1 ID: " + ThreadLocalExample.getThreadId());
        });

        Thread tl2 = new Thread(() -> {
            ThreadLocalExample.setThreadId(2);
            System.out.println("Thread 2 ID: " + ThreadLocalExample.getThreadId());
        });

        tl1.start();
        tl2.start();

        try {
            tl1.join();
            tl2.join();
        } catch (InterruptedException e) {}

        // Pattern 3: Synchronized collections
        System.out.println("\n--- Pattern 3: Synchronized Collections ---");
        SynchronizedCollectionExample.demonstrateSyncCollection();

        // Pattern 4: Concurrent collections
        System.out.println("\n--- Pattern 4: Concurrent Collections ---");
        ConcurrentCollectionExample.demonstrateConcurrentCollection();

        // Pattern 5: Singleton
        System.out.println("\n--- Pattern 5: Thread-Safe Singleton ---");

        Thread s1 = new Thread(() -> {
            ThreadSafeSingleton.getInstance();
        });

        Thread s2 = new Thread(() -> {
            ThreadSafeSingleton.getInstance();
        });

        s1.start();
        s2.start();

        try {
            s1.join();
            s2.join();
        } catch (InterruptedException e) {}

        System.out.println("Singleton created only once!");

        // Pattern 6: Atomic variables
        System.out.println("\n--- Pattern 6: Atomic Variables ---");

        AtomicExample atomic = new AtomicExample();

        Thread at1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                atomic.increment();
            }
        });

        Thread at2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                atomic.increment();
            }
        });

        at1.start();
        at2.start();

        try {
            at1.join();
            at2.join();
        } catch (InterruptedException e) {}

        System.out.println("Atomic counter: " + atomic.getCount());

        System.out.println("\n==================================");
    }
}
```

**Expected Output:**
```
===== THREAD SAFETY PATTERNS =====

--- Pattern 1: Immutable Objects ---
Immutable person: John, 30
Thread-safe because immutable!

--- Pattern 2: Thread-Local Storage ---
Thread 1 ID: 1
Thread 2 ID: 2

--- Pattern 3: Synchronized Collections ---
Sync list size: 200

--- Pattern 4: Concurrent Collections ---
Concurrent map size: 200

--- Pattern 5: Thread-Safe Singleton ---
Singleton created
Singleton created only once!

--- Pattern 6: Atomic Variables ---
Atomic counter: 2000

==================================
```

**💡 Thread Safety Patterns:**

```java
// 1. Immutability (best)
final class Immutable {
    private final int value;
    Immutable(int value) { this.value = value; }
    public int getValue() { return value; }
    // No setters
}

// 2. Synchronization
synchronized void method() { }

// 3. Concurrent Collections
ConcurrentHashMap<K,V> map = new ConcurrentHashMap<>();
CopyOnWriteArrayList<T> list = new CopyOnWriteArrayList<>();

// 4. Atomic Variables
AtomicInteger counter = new AtomicInteger();
counter.incrementAndGet();

// 5. Thread-Local
ThreadLocal<T> threadLocal = new ThreadLocal<>();

// 6. Volatile (visibility)
private volatile boolean flag;
```

**Thread-Safe Collection Options:**

| Non-Safe | Synchronized | Concurrent |
|----------|--------------|------------|
| ArrayList | Collections.synchronizedList() | CopyOnWriteArrayList |
| HashMap | Collections.synchronizedMap() | ConcurrentHashMap |
| HashSet | Collections.synchronizedSet() | ConcurrentSkipListSet |
| TreeMap | Collections.synchronizedSortedMap() | ConcurrentSkipListMap |

**✅ Success Criteria:**
- Know multiple thread safety patterns
- Can choose appropriate pattern for scenario
- Understand immutability benefits
- Master concurrent collections
- Can use atomic variables

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Using synchronized unnecessarily | Performance hit | Use concurrent collections or atomic |
| Forgetting volatile on flags | Visibility issues | Use volatile for flags |
| Modifying "immutable" object | Not truly immutable | Make all fields final |
| Not using concurrent collections | Poor performance | Use ConcurrentHashMap etc |

**🎯 Challenge:**
1. Implement thread-safe LRU cache
2. Create thread-safe object pool
3. Build concurrent task queue
4. Implement thread-safe counter with statistics
5. Create lock-free stack using atomic operations

---

#### Exercise 6: Producer-Consumer Problem (30 minutes)

**What you'll learn:** Classic concurrency problem using wait/notify

**Create class: `ProducerConsumerDemo`**

**Concept:** **Producer-Consumer** is a classic multi-threading problem where producers add items to a shared buffer, and consumers remove items. Requires coordination to prevent overflow/underflow.

```
Producer: Creates items → Adds to buffer
Consumer: Removes items from buffer → Processes

Issues:
- Producer must wait if buffer full
- Consumer must wait if buffer empty
- Need synchronization for shared buffer

Solution: wait() and notify()
```

**Step-by-Step:**

```java
import java.util.*;

// Shared buffer with synchronization
class SharedBuffer {
    private Queue<Integer> queue = new LinkedList<>();
    private int capacity;

    public SharedBuffer(int capacity) {
        this.capacity = capacity;
    }

    public synchronized void produce(int item) throws InterruptedException {
        // Wait if queue is full
        while (queue.size() == capacity) {
            System.out.println("Buffer full! Producer waiting...");
            wait(); // Release lock and wait
        }

        queue.add(item);
        System.out.println("Produced: " + item + " | Buffer size: " + queue.size());

        // Notify consumers
        notifyAll();
    }

    public synchronized int consume() throws InterruptedException {
        // Wait if queue is empty
        while (queue.isEmpty()) {
            System.out.println("Buffer empty! Consumer waiting...");
            wait(); // Release lock and wait
        }

        int item = queue.poll();
        System.out.println("Consumed: " + item + " | Buffer size: " + queue.size());

        // Notify producers
        notifyAll();

        return item;
    }

    public synchronized int size() {
        return queue.size();
    }
}

// Producer thread
class Producer implements Runnable {
    private SharedBuffer buffer;
    private String name;

    public Producer(SharedBuffer buffer, String name) {
        this.buffer = buffer;
        this.name = name;
    }

    @Override
    public void run() {
        try {
            for (int i = 1; i <= 10; i++) {
                int item = (int)(Math.random() * 100);
                System.out.println(name + " producing item: " + item);
                buffer.produce(item);
                Thread.sleep((int)(Math.random() * 1000)); // Random delay
            }
            System.out.println(name + " finished producing");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

// Consumer thread
class Consumer implements Runnable {
    private SharedBuffer buffer;
    private String name;

    public Consumer(SharedBuffer buffer, String name) {
        this.buffer = buffer;
        this.name = name;
    }

    @Override
    public void run() {
        try {
            for (int i = 1; i <= 10; i++) {
                System.out.println(name + " consuming...");
                int item = buffer.consume();
                System.out.println(name + " consumed item: " + item);
                Thread.sleep((int)(Math.random() * 1500)); // Random delay
            }
            System.out.println(name + " finished consuming");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

// Using BlockingQueue (Java concurrent utility)
class ProducerConsumerWithBlockingQueue {
    static class Producer2 implements Runnable {
        private java.util.concurrent.BlockingQueue<Integer> queue;
        private String name;

        public Producer2(java.util.concurrent.BlockingQueue<Integer> queue, String name) {
            this.queue = queue;
            this.name = name;
        }

        @Override
        public void run() {
            try {
                for (int i = 1; i <= 5; i++) {
                    int item = i * 10;
                    System.out.println(name + " putting: " + item);
                    queue.put(item); // Blocks if full
                    Thread.sleep(500);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    static class Consumer2 implements Runnable {
        private java.util.concurrent.BlockingQueue<Integer> queue;
        private String name;

        public Consumer2(java.util.concurrent.BlockingQueue<Integer> queue, String name) {
            this.queue = queue;
            this.name = name;
        }

        @Override
        public void run() {
            try {
                for (int i = 1; i <= 5; i++) {
                    int item = queue.take(); // Blocks if empty
                    System.out.println(name + " took: " + item);
                    Thread.sleep(700);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}

public class ProducerConsumerDemo {
    public static void main(String[] args) {
        System.out.println("===== PRODUCER-CONSUMER PROBLEM =====\n");

        // Part 1: Manual implementation with wait/notify
        System.out.println("--- Part 1: Manual Implementation ---");

        SharedBuffer buffer = new SharedBuffer(5); // Capacity 5

        Thread producer1 = new Thread(new Producer(buffer, "Producer-1"));
        Thread producer2 = new Thread(new Producer(buffer, "Producer-2"));
        Thread consumer1 = new Thread(new Consumer(buffer, "Consumer-1"));
        Thread consumer2 = new Thread(new Consumer(buffer, "Consumer-2"));

        producer1.start();
        producer2.start();
        consumer1.start();
        consumer2.start();

        try {
            producer1.join();
            producer2.join();
            consumer1.join();
            consumer2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\nAll producers and consumers finished");
        System.out.println("Final buffer size: " + buffer.size());

        // Part 2: Using BlockingQueue (better approach)
        System.out.println("\n--- Part 2: Using BlockingQueue ---");

        java.util.concurrent.BlockingQueue<Integer> blockingQueue =
            new java.util.concurrent.ArrayBlockingQueue<>(3);

        Thread p1 = new Thread(new ProducerConsumerWithBlockingQueue.Producer2(
            blockingQueue, "Producer-A"));
        Thread c1 = new Thread(new ProducerConsumerWithBlockingQueue.Consumer2(
            blockingQueue, "Consumer-A"));

        p1.start();
        c1.start();

        try {
            p1.join();
            c1.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\n====================================");
    }
}
```

**Expected Output:**
```
===== PRODUCER-CONSUMER PROBLEM =====

--- Part 1: Manual Implementation ---
Producer-1 producing item: 42
Produced: 42 | Buffer size: 1
Producer-2 producing item: 73
Produced: 73 | Buffer size: 2
Consumer-1 consuming...
Consumed: 42 | Buffer size: 1
Consumer-1 consumed item: 42
Consumer-2 consuming...
Consumed: 73 | Buffer size: 0
Consumer-2 consumed item: 73
Buffer empty! Consumer waiting...
Producer-1 producing item: 15
Produced: 15 | Buffer size: 1
Consumer-1 consuming...
Consumed: 15 | Buffer size: 0
...
Producer-1 finished producing
Producer-2 finished producing
Consumer-1 finished consuming
Consumer-2 finished consuming

All producers and consumers finished
Final buffer size: 0

--- Part 2: Using BlockingQueue ---
Producer-A putting: 10
Producer-A putting: 20
Consumer-A took: 10
Producer-A putting: 30
Consumer-A took: 20
...

====================================
```

**💡 Wait/Notify Pattern:**

```java
synchronized void produce() throws InterruptedException {
    while (bufferFull()) {
        wait(); // Release lock and wait
    }
    // Add to buffer
    notifyAll(); // Wake up consumers
}

synchronized void consume() throws InterruptedException {
    while (bufferEmpty()) {
        wait(); // Release lock and wait
    }
    // Remove from buffer
    notifyAll(); // Wake up producers
}
```

**Key Methods:**

| Method | Purpose |
|--------|---------|
| `wait()` | Release lock and wait until notified |
| `notify()` | Wake up one waiting thread |
| `notifyAll()` | Wake up all waiting threads |

**✅ Success Criteria:**
- Understand producer-consumer problem
- Can implement using wait/notify
- Know how to use BlockingQueue
- Prevent buffer overflow/underflow
- Handle multiple producers/consumers

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Using if instead of while | Spurious wakeup issues | Always use while loop |
| Forgetting notifyAll() | Threads wait forever | Always notify after state change |
| Not synchronizing | Race conditions | All wait/notify in synchronized |
| Calling wait() without lock | IllegalMonitorStateException | Only in synchronized block |

**🎯 Challenge:**
1. Implement bounded buffer with multiple producers/consumers
2. Create priority-based producer-consumer
3. Build message queue system
4. Implement dining philosophers problem
5. Create thread pool using producer-consumer pattern

---

#### Exercise 7: Real-World Multithreading Application (30 minutes)

**What you'll learn:** Building a complete multithreaded application

**Create class: `DownloadManager`**

**Concept:** Building a practical download manager that downloads multiple files concurrently.

**Step-by-Step:**

```java
import java.util.*;
import java.util.concurrent.*;

// Represents a file download task
class DownloadTask implements Callable<String> {
    private String fileName;
    private int fileSize; // in MB
    private int downloadSpeed; // MB per second

    public DownloadTask(String fileName, int fileSize, int downloadSpeed) {
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.downloadSpeed = downloadSpeed;
    }

    @Override
    public String call() throws Exception {
        System.out.println("Starting download: " + fileName +
                         " (" + fileSize + " MB)");

        int downloaded = 0;
        while (downloaded < fileSize) {
            Thread.sleep(1000); // 1 second
            downloaded += downloadSpeed;

            if (downloaded > fileSize) {
                downloaded = fileSize;
            }

            int progress = (downloaded * 100) / fileSize;
            System.out.println(fileName + ": " + progress + "% complete " +
                             "(" + downloaded + "/" + fileSize + " MB)");
        }

        System.out.println("Completed: " + fileName);
        return fileName + " downloaded successfully";
    }

    public String getFileName() {
        return fileName;
    }
}

// Download manager with thread pool
class MultiThreadedDownloadManager {
    private ExecutorService executor;
    private List<Future<String>> futures;

    public MultiThreadedDownloadManager(int poolSize) {
        this.executor = Executors.newFixedThreadPool(poolSize);
        this.futures = new ArrayList<>();
    }

    public void addDownload(DownloadTask task) {
        Future<String> future = executor.submit(task);
        futures.add(future);
        System.out.println("Added to queue: " + task.getFileName());
    }

    public void waitForAllDownloads() {
        System.out.println("\nWaiting for all downloads to complete...\n");

        for (Future<String> future : futures) {
            try {
                String result = future.get(); // Blocks until done
                System.out.println("Result: " + result);
            } catch (InterruptedException | ExecutionException e) {
                System.out.println("Download failed: " + e.getMessage());
            }
        }

        executor.shutdown();
        System.out.println("\nAll downloads complete!");
    }

    public void shutdown() {
        executor.shutdown();
    }
}

// Progress tracking with synchronized access
class DownloadProgress {
    private Map<String, Integer> progress = new ConcurrentHashMap<>();

    public synchronized void updateProgress(String file, int percent) {
        progress.put(file, percent);
        displayProgress();
    }

    private void displayProgress() {
        System.out.println("\n=== Overall Progress ===");
        progress.forEach((file, percent) -> {
            System.out.println(file + ": " + percent + "%");
        });
        System.out.println("========================\n");
    }
}

// Download with progress callback
class ProgressiveDownloadTask implements Runnable {
    private String fileName;
    private int fileSize;
    private int downloadSpeed;
    private DownloadProgress progressTracker;

    public ProgressiveDownloadTask(String fileName, int fileSize,
                                   int downloadSpeed, DownloadProgress tracker) {
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.downloadSpeed = downloadSpeed;
        this.progressTracker = tracker;
    }

    @Override
    public void run() {
        int downloaded = 0;

        while (downloaded < fileSize) {
            try {
                Thread.sleep(1000);
                downloaded += downloadSpeed;

                if (downloaded > fileSize) {
                    downloaded = fileSize;
                }

                int progress = (downloaded * 100) / fileSize;
                progressTracker.updateProgress(fileName, progress);

            } catch (InterruptedException e) {
                System.out.println(fileName + " interrupted");
                return;
            }
        }

        System.out.println(fileName + " download complete!");
    }
}

public class DownloadManager {
    public static void main(String[] args) {
        System.out.println("===== MULTITHREADED DOWNLOAD MANAGER =====\n");

        // Part 1: Basic download manager
        System.out.println("--- Part 1: Basic Download Manager ---");

        MultiThreadedDownloadManager manager = new MultiThreadedDownloadManager(3);

        // Add download tasks
        manager.addDownload(new DownloadTask("video.mp4", 10, 2)); // 10MB, 2MB/s
        manager.addDownload(new DownloadTask("music.mp3", 5, 1));  // 5MB, 1MB/s
        manager.addDownload(new DownloadTask("document.pdf", 3, 1)); // 3MB, 1MB/s
        manager.addDownload(new DownloadTask("image.jpg", 2, 2));  // 2MB, 2MB/s

        manager.waitForAllDownloads();

        // Part 2: Download with progress tracking
        System.out.println("\n--- Part 2: Progress Tracking ---");

        DownloadProgress progressTracker = new DownloadProgress();
        ExecutorService executor = Executors.newFixedThreadPool(2);

        executor.submit(new ProgressiveDownloadTask(
            "movie.mkv", 20, 3, progressTracker));
        executor.submit(new ProgressiveDownloadTask(
            "software.zip", 15, 2, progressTracker));

        executor.shutdown();
        try {
            executor.awaitTermination(1, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Part 3: Priority downloads
        System.out.println("\n--- Part 3: Priority Queue ---");

        PriorityBlockingQueue<DownloadTask> priorityQueue =
            new PriorityBlockingQueue<>(10, (t1, t2) ->
                Integer.compare(t2.fileSize, t1.fileSize)); // Larger files first

        priorityQueue.add(new DownloadTask("small.txt", 1, 1));
        priorityQueue.add(new DownloadTask("large.iso", 100, 5));
        priorityQueue.add(new DownloadTask("medium.zip", 50, 3));

        System.out.println("Download order (by size, largest first):");
        while (!priorityQueue.isEmpty()) {
            DownloadTask task = priorityQueue.poll();
            System.out.println("  " + task.getFileName() +
                             " (" + task.fileSize + " MB)");
        }

        System.out.println("\n==========================================");
    }
}
```

**Expected Output:**
```
===== MULTITHREADED DOWNLOAD MANAGER =====

--- Part 1: Basic Download Manager ---
Added to queue: video.mp4
Added to queue: music.mp3
Added to queue: document.pdf
Added to queue: image.jpg

Waiting for all downloads to complete...

Starting download: video.mp4 (10 MB)
Starting download: music.mp3 (5 MB)
Starting download: document.pdf (3 MB)
video.mp4: 20% complete (2/10 MB)
music.mp3: 20% complete (1/5 MB)
document.pdf: 33% complete (1/3 MB)
...
Completed: document.pdf
Starting download: image.jpg (2 MB)
...
Completed: video.mp4
Completed: music.mp3
Completed: image.jpg
Result: video.mp4 downloaded successfully
Result: music.mp3 downloaded successfully
Result: document.pdf downloaded successfully
Result: image.jpg downloaded successfully

All downloads complete!

--- Part 2: Progress Tracking ---
=== Overall Progress ===
movie.mkv: 15%
software.zip: 13%
========================
...
movie.mkv download complete!
software.zip download complete!

--- Part 3: Priority Queue ---
Download order (by size, largest first):
  large.iso (100 MB)
  medium.zip (50 MB)
  small.txt (1 MB)

==========================================
```

**💡 ExecutorService Benefits:**

```java
// Thread pool creation
ExecutorService executor = Executors.newFixedThreadPool(5);

// Submit tasks
executor.submit(runnable);           // Fire and forget
Future<T> future = executor.submit(callable); // Get result

// Wait for completion
executor.shutdown();
executor.awaitTermination(timeout, unit);

// Get results
T result = future.get(); // Blocks until done
```

**✅ Success Criteria:**
- Can build complete multithreaded application
- Know how to use ExecutorService
- Understand Future for async results
- Can implement progress tracking
- Master concurrent data structures

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Not shutting down executor | Resource leak | Always call shutdown() |
| Ignoring ExecutionException | Lost errors | Handle exceptions from future.get() |
| Creating too many threads | Resource exhaustion | Use thread pool |
| Blocking UI thread | Unresponsive app | Use background threads |

**🎯 Challenge:**
1. Add pause/resume functionality
2. Implement download speed limiter
3. Add retry logic for failed downloads
4. Create download scheduler (time-based)
5. Build complete file transfer application with UI
6. Implement bandwidth allocation between downloads

---

**🎯 Day 29 Complete! You now master Java Multithreading!**

**Key Takeaways:**
- Thread creation and lifecycle
- Synchronization and thread safety
- Producer-consumer pattern
- ExecutorService and thread pools
- Real-world concurrent applications

**Next Steps:**
- Study advanced concurrency (java.util.concurrent package)
- Learn about ReentrantLock, Semaphore, CountDownLatch
- Explore Fork/Join framework
- Practice with concurrent design patterns
- Build more complex multithreaded applications

---

**End of Day 29 Exercises**
