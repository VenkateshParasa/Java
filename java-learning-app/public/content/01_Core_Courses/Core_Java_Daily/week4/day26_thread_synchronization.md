# Day 26: Thread Synchronization

**Week 4: Advanced Java Concepts**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Topics Covered](#topics-covered)
- [Detailed Content](#detailed-content)
- [Practical Exercises](#practical-exercises)
- [Key Takeaways](#key-takeaways)
- [Additional Resources](#additional-resources)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 26, you will be able to:
- Understand race conditions and thread safety issues
- Use the synchronized keyword for thread synchronization
- Implement synchronized methods and blocks
- Understand monitor locks and intrinsic locks
- Use wait(), notify(), and notifyAll() methods
- Implement producer-consumer pattern
- Understand deadlock and how to avoid it
- Use volatile keyword appropriately
- Work with thread-safe collections

---

## 📚 Topics Covered

### 1. Introduction to Thread Synchronization

When multiple threads access shared resources, synchronization is needed to prevent data inconsistency.

#### The Problem: Race Condition

```java
class Counter {
    private int count = 0;
    
    public void increment() {
        count++;  // Not atomic! (read, increment, write)
    }
    
    public int getCount() {
        return count;
    }
}

public class RaceConditionExample {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        
        // Create 1000 threads that increment counter
        Thread[] threads = new Thread[1000];
        for (int i = 0; i < 1000; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    counter.increment();
                }
            });
            threads[i].start();
        }
        
        // Wait for all threads to complete
        for (Thread thread : threads) {
            thread.join();
        }
        
        System.out.println("Expected: 1000000");
        System.out.println("Actual: " + counter.getCount());
        // Actual will be less than expected due to race condition
    }
}
```

---

### 2. The synchronized Keyword

The `synchronized` keyword ensures that only one thread can execute a block of code at a time.

#### Synchronized Method:

```java
class SynchronizedCounter {
    private int count = 0;
    
    // Synchronized method
    public synchronized void increment() {
        count++;
    }
    
    public synchronized int getCount() {
        return count;
    }
}

public class SynchronizedMethodExample {
    public static void main(String[] args) throws InterruptedException {
        SynchronizedCounter counter = new SynchronizedCounter();
        
        Thread[] threads = new Thread[1000];
        for (int i = 0; i < 1000; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    counter.increment();
                }
            });
            threads[i].start();
        }
        
        for (Thread thread : threads) {
            thread.join();
        }
        
        System.out.println("Count: " + counter.getCount());
        // Now it will be exactly 1000000
    }
}
```

#### Synchronized Block:

```java
class BankAccount {
    private double balance = 0;
    
    public void deposit(double amount) {
        synchronized(this) {
            double newBalance = balance + amount;
            try {
                Thread.sleep(10);  // Simulate processing time
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            balance = newBalance;
        }
    }
    
    public synchronized double getBalance() {
        return balance;
    }
}

public class SynchronizedBlockExample {
    public static void main(String[] args) throws InterruptedException {
        BankAccount account = new BankAccount();
        
        Thread[] threads = new Thread[10];
        for (int i = 0; i < 10; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 100; j++) {
                    account.deposit(10);
                }
            });
            threads[i].start();
        }
        
        for (Thread thread : threads) {
            thread.join();
        }
        
        System.out.println("Final balance: " + account.getBalance());
    }
}
```

---

### 3. Static Synchronization

For static methods, the lock is on the class object, not instance.

```java
class StaticCounter {
    private static int count = 0;
    
    // Synchronized on class object
    public static synchronized void increment() {
        count++;
    }
    
    public static synchronized int getCount() {
        return count;
    }
}

public class StaticSynchronizationExample {
    public static void main(String[] args) throws InterruptedException {
        Thread[] threads = new Thread[1000];
        
        for (int i = 0; i < 1000; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    StaticCounter.increment();
                }
            });
            threads[i].start();
        }
        
        for (Thread thread : threads) {
            thread.join();
        }
        
        System.out.println("Count: " + StaticCounter.getCount());
    }
}
```

---

### 4. Inter-Thread Communication

Use wait(), notify(), and notifyAll() for thread communication.

#### wait() and notify() Example:

```java
class SharedResource {
    private int data;
    private boolean hasData = false;
    
    public synchronized void produce(int value) {
        while (hasData) {
            try {
                wait();  // Wait until data is consumed
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        
        this.data = value;
        hasData = true;
        System.out.println("Produced: " + value);
        notify();  // Notify consumer
    }
    
    public synchronized int consume() {
        while (!hasData) {
            try {
                wait();  // Wait until data is produced
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        
        hasData = false;
        System.out.println("Consumed: " + data);
        notify();  // Notify producer
        return data;
    }
}

public class WaitNotifyExample {
    public static void main(String[] args) {
        SharedResource resource = new SharedResource();
        
        // Producer thread
        Thread producer = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                resource.produce(i);
            }
        });
        
        // Consumer thread
        Thread consumer = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                resource.consume();
            }
        });
        
        producer.start();
        consumer.start();
    }
}
```

---

### 5. Producer-Consumer Pattern

Classic synchronization problem using wait() and notify().

```java
import java.util.LinkedList;
import java.util.Queue;

class Buffer {
    private Queue<Integer> queue = new LinkedList<>();
    private int capacity;
    
    public Buffer(int capacity) {
        this.capacity = capacity;
    }
    
    public synchronized void produce(int value) throws InterruptedException {
        while (queue.size() == capacity) {
            System.out.println("Buffer full, producer waiting...");
            wait();
        }
        
        queue.add(value);
        System.out.println("Produced: " + value + 
            " | Buffer size: " + queue.size());
        notifyAll();
    }
    
    public synchronized int consume() throws InterruptedException {
        while (queue.isEmpty()) {
            System.out.println("Buffer empty, consumer waiting...");
            wait();
        }
        
        int value = queue.poll();
        System.out.println("Consumed: " + value + 
            " | Buffer size: " + queue.size());
        notifyAll();
        return value;
    }
}

class Producer implements Runnable {
    private Buffer buffer;
    
    public Producer(Buffer buffer) {
        this.buffer = buffer;
    }
    
    @Override
    public void run() {
        try {
            for (int i = 1; i <= 10; i++) {
                buffer.produce(i);
                Thread.sleep(100);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

class Consumer implements Runnable {
    private Buffer buffer;
    
    public Consumer(Buffer buffer) {
        this.buffer = buffer;
    }
    
    @Override
    public void run() {
        try {
            for (int i = 1; i <= 10; i++) {
                buffer.consume();
                Thread.sleep(200);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

public class ProducerConsumerExample {
    public static void main(String[] args) {
        Buffer buffer = new Buffer(5);
        
        Thread producer = new Thread(new Producer(buffer));
        Thread consumer = new Thread(new Consumer(buffer));
        
        producer.start();
        consumer.start();
    }
}
```

---

### 6. Deadlock

Deadlock occurs when two or more threads are blocked forever, waiting for each other.

#### Deadlock Example:

```java
class Resource1 {
    public synchronized void method1(Resource2 resource2) {
        System.out.println(Thread.currentThread().getName() + 
            ": Locked Resource1");
        
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println(Thread.currentThread().getName() + 
            ": Waiting for Resource2");
        resource2.method2();
    }
    
    public synchronized void method2() {
        System.out.println("Inside Resource1.method2()");
    }
}

class Resource2 {
    public synchronized void method1(Resource1 resource1) {
        System.out.println(Thread.currentThread().getName() + 
            ": Locked Resource2");
        
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println(Thread.currentThread().getName() + 
            ": Waiting for Resource1");
        resource1.method2();
    }
    
    public synchronized void method2() {
        System.out.println("Inside Resource2.method2()");
    }
}

public class DeadlockExample {
    public static void main(String[] args) {
        Resource1 r1 = new Resource1();
        Resource2 r2 = new Resource2();
        
        Thread t1 = new Thread(() -> r1.method1(r2), "Thread-1");
        Thread t2 = new Thread(() -> r2.method1(r1), "Thread-2");
        
        t1.start();
        t2.start();
        // This will cause deadlock!
    }
}
```

#### Avoiding Deadlock:

```java
public class DeadlockAvoidance {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();
    
    public void method1() {
        synchronized(lock1) {
            System.out.println(Thread.currentThread().getName() + 
                ": Locked lock1");
            
            synchronized(lock2) {
                System.out.println(Thread.currentThread().getName() + 
                    ": Locked lock2");
                // Do work
            }
        }
    }
    
    public void method2() {
        // Same lock order prevents deadlock
        synchronized(lock1) {
            System.out.println(Thread.currentThread().getName() + 
                ": Locked lock1");
            
            synchronized(lock2) {
                System.out.println(Thread.currentThread().getName() + 
                    ": Locked lock2");
                // Do work
            }
        }
    }
    
    public static void main(String[] args) {
        DeadlockAvoidance obj = new DeadlockAvoidance();
        
        Thread t1 = new Thread(() -> obj.method1(), "Thread-1");
        Thread t2 = new Thread(() -> obj.method2(), "Thread-2");
        
        t1.start();
        t2.start();
        // No deadlock!
    }
}
```

---

### 7. The volatile Keyword

The `volatile` keyword ensures visibility of changes across threads.

```java
class VolatileExample {
    private volatile boolean flag = false;
    
    public void writer() {
        System.out.println("Writer: Setting flag to true");
        flag = true;
    }
    
    public void reader() {
        System.out.println("Reader: Waiting for flag...");
        while (!flag) {
            // Without volatile, this might loop forever
        }
        System.out.println("Reader: Flag is true!");
    }
}

public class VolatileDemo {
    public static void main(String[] args) {
        VolatileExample example = new VolatileExample();
        
        Thread writer = new Thread(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            example.writer();
        });
        
        Thread reader = new Thread(() -> example.reader());
        
        reader.start();
        writer.start();
    }
}
```

**volatile vs synchronized:**
- `volatile`: Ensures visibility, no atomicity
- `synchronized`: Ensures both visibility and atomicity

---

### 8. Thread-Safe Collections

Java provides thread-safe collection classes.

```java
import java.util.*;
import java.util.concurrent.*;

public class ThreadSafeCollections {
    public static void main(String[] args) {
        // Thread-safe collections
        List<Integer> syncList = Collections.synchronizedList(
            new ArrayList<>());
        
        Set<Integer> syncSet = Collections.synchronizedSet(
            new HashSet<>());
        
        Map<String, Integer> syncMap = Collections.synchronizedMap(
            new HashMap<>());
        
        // Concurrent collections (better performance)
        List<Integer> concurrentList = new CopyOnWriteArrayList<>();
        Set<Integer> concurrentSet = new CopyOnWriteArraySet<>();
        Map<String, Integer> concurrentMap = new ConcurrentHashMap<>();
        
        // Example usage
        Thread[] threads = new Thread[10];
        for (int i = 0; i < 10; i++) {
            final int value = i;
            threads[i] = new Thread(() -> {
                concurrentList.add(value);
                concurrentSet.add(value);
                concurrentMap.put("Key" + value, value);
            });
            threads[i].start();
        }
        
        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        
        System.out.println("List size: " + concurrentList.size());
        System.out.println("Set size: " + concurrentSet.size());
        System.out.println("Map size: " + concurrentMap.size());
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Synchronized Counter
Fix the race condition in a counter class.

```java
class SafeCounter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;
    }
    
    public synchronized void decrement() {
        count--;
    }
    
    public synchronized int getCount() {
        return count;
    }
}

public class Exercise1 {
    public static void main(String[] args) throws InterruptedException {
        SafeCounter counter = new SafeCounter();
        
        Thread incrementer = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                counter.increment();
            }
        });
        
        Thread decrementer = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                counter.decrement();
            }
        });
        
        incrementer.start();
        decrementer.start();
        
        incrementer.join();
        decrementer.join();
        
        System.out.println("Final count: " + counter.getCount());
        // Should be 0
    }
}
```

---

### Exercise 2: Bank Account Transfer
Implement thread-safe money transfer between accounts.

```java
class Account {
    private double balance;
    private final int id;
    
    public Account(int id, double balance) {
        this.id = id;
        this.balance = balance;
    }
    
    public synchronized void deposit(double amount) {
        balance += amount;
    }
    
    public synchronized void withdraw(double amount) {
        if (balance >= amount) {
            balance -= amount;
        }
    }
    
    public synchronized double getBalance() {
        return balance;
    }
    
    public int getId() {
        return id;
    }
}

public class Exercise2 {
    public static void transfer(Account from, Account to, double amount) {
        // Lock in consistent order to avoid deadlock
        Account first = from.getId() < to.getId() ? from : to;
        Account second = from.getId() < to.getId() ? to : from;
        
        synchronized(first) {
            synchronized(second) {
                from.withdraw(amount);
                to.deposit(amount);
                System.out.println("Transferred " + amount + 
                    " from Account " + from.getId() + 
                    " to Account " + to.getId());
            }
        }
    }
    
    public static void main(String[] args) throws InterruptedException {
        Account acc1 = new Account(1, 1000);
        Account acc2 = new Account(2, 1000);
        
        Thread t1 = new Thread(() -> transfer(acc1, acc2, 100));
        Thread t2 = new Thread(() -> transfer(acc2, acc1, 50));
        
        t1.start();
        t2.start();
        
        t1.join();
        t2.join();
        
        System.out.println("Account 1 balance: " + acc1.getBalance());
        System.out.println("Account 2 balance: " + acc2.getBalance());
    }
}
```

---

### Exercise 3: Print Sequence
Two threads print numbers in sequence.

```java
class SequencePrinter {
    private int number = 1;
    private int max;
    
    public SequencePrinter(int max) {
        this.max = max;
    }
    
    public synchronized void printOdd() {
        while (number <= max) {
            while (number % 2 == 0) {
                try {
                    wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            
            if (number <= max) {
                System.out.println("Odd: " + number);
                number++;
                notify();
            }
        }
    }
    
    public synchronized void printEven() {
        while (number <= max) {
            while (number % 2 != 0) {
                try {
                    wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            
            if (number <= max) {
                System.out.println("Even: " + number);
                number++;
                notify();
            }
        }
    }
}

public class Exercise3 {
    public static void main(String[] args) {
        SequencePrinter printer = new SequencePrinter(10);
        
        Thread oddThread = new Thread(() -> printer.printOdd());
        Thread evenThread = new Thread(() -> printer.printEven());
        
        oddThread.start();
        evenThread.start();
    }
}
```

---

### Exercise 4: Thread-Safe Stack
Implement a thread-safe stack.

```java
import java.util.ArrayList;
import java.util.List;

class ThreadSafeStack<T> {
    private List<T> stack = new ArrayList<>();
    
    public synchronized void push(T item) {
        stack.add(item);
        System.out.println("Pushed: " + item);
        notifyAll();
    }
    
    public synchronized T pop() throws InterruptedException {
        while (stack.isEmpty()) {
            wait();
        }
        T item = stack.remove(stack.size() - 1);
        System.out.println("Popped: " + item);
        return item;
    }
    
    public synchronized boolean isEmpty() {
        return stack.isEmpty();
    }
    
    public synchronized int size() {
        return stack.size();
    }
}

public class Exercise4 {
    public static void main(String[] args) {
        ThreadSafeStack<Integer> stack = new ThreadSafeStack<>();
        
        Thread pusher = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                stack.push(i);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        
        Thread popper = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                try {
                    stack.pop();
                    Thread.sleep(200);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        
        pusher.start();
        popper.start();
    }
}
```

---

### Exercise 5: Ticket Booking System
Simulate thread-safe ticket booking.

```java
class TicketBooking {
    private int availableTickets;
    
    public TicketBooking(int tickets) {
        this.availableTickets = tickets;
    }
    
    public synchronized boolean bookTicket(String customer, int count) {
        if (availableTickets >= count) {
            System.out.println(customer + " is booking " + count + 
                " ticket(s)...");
            
            try {
                Thread.sleep(100);  // Simulate processing
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            
            availableTickets -= count;
            System.out.println(customer + " successfully booked " + count + 
                " ticket(s). Remaining: " + availableTickets);
            return true;
        } else {
            System.out.println(customer + " failed to book " + count + 
                " ticket(s). Not enough tickets!");
            return false;
        }
    }
    
    public synchronized int getAvailableTickets() {
        return availableTickets;
    }
}

public class Exercise5 {
    public static void main(String[] args) {
        TicketBooking booking = new TicketBooking(10);
        
        Thread[] customers = new Thread[5];
        for (int i = 0; i < 5; i++) {
            final String customerName = "Customer-" + (i + 1);
            customers[i] = new Thread(() -> {
                booking.bookTicket(customerName, 3);
            });
            customers[i].start();
        }
        
        for (Thread customer : customers) {
            try {
                customer.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        
        System.out.println("\nFinal available tickets: " + 
            booking.getAvailableTickets());
    }
}
```

---

### Exercise 6: Read-Write Lock Pattern
Implement simple read-write lock.

```java
class ReadWriteCounter {
    private int count = 0;
    private int readers = 0;
    private int writers = 0;
    
    public synchronized void startRead() throws InterruptedException {
        while (writers > 0) {
            wait();
        }
        readers++;
    }
    
    public synchronized void endRead() {
        readers--;
        notifyAll();
    }
    
    public synchronized void startWrite() throws InterruptedException {
        while (readers > 0 || writers > 0) {
            wait();
        }
        writers++;
    }
    
    public synchronized void endWrite() {
        writers--;
        notifyAll();
    }
    
    public int read() throws InterruptedException {
        startRead();
        try {
            System.out.println(Thread.currentThread().getName() + 
                " reading: " + count);
            Thread.sleep(100);
            return count;
        } finally {
            endRead();
        }
    }
    
    public void write(int value) throws InterruptedException {
        startWrite();
        try {
            System.out.println(Thread.currentThread().getName() + 
                " writing: " + value);
            count = value;
            Thread.sleep(100);
        } finally {
            endWrite();
        }
    }
}

public class Exercise6 {
    public static void main(String[] args) {
        ReadWriteCounter counter = new ReadWriteCounter();
        
        // Multiple readers
        for (int i = 0; i < 3; i++) {
            new Thread(() -> {
                try {
                    counter.read();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }, "Reader-" + i).start();
        }
        
        // Single writer
        new Thread(() -> {
            try {
                counter.write(42);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }, "Writer").start();
    }
}
```

---

## 🔑 Key Takeaways

1. **Race Condition**: Occurs when multiple threads access shared data concurrently
2. **synchronized Keyword**: Ensures mutual exclusion for critical sections
3. **Monitor Lock**: Every object has an intrinsic lock for synchronization
4. **wait() and notify()**: Enable inter-thread communication
5. **Deadlock**: Occurs when threads wait for each other indefinitely
6. **Deadlock Prevention**: Use consistent lock ordering
7. **volatile**: Ensures visibility but not atomicity
8. **Thread-Safe Collections**: Use synchronized or concurrent collections
9. **Best Practice**: Minimize synchronized blocks for better performance
10. **Always**: Release locks in finally blocks when using explicit locks

---

## 📖 Additional Resources

### Official Documentation:
- [Java Concurrency Tutorial](https://docs.oracle.com/javase/tutorial/essential/concurrency/)
- [Synchronized Methods](https://docs.oracle.com/javase/tutorial/essential/concurrency/syncmeth.html)
- [Intrinsic Locks](https://docs.oracle.com/javase/tutorial/essential/concurrency/locksync.html)

### Best Practices:
- Keep synchronized blocks as small as possible
- Avoid calling external methods within synchronized blocks
- Use concurrent collections when possible
- Always use consistent lock ordering
- Consider using java.util.concurrent utilities

---

## 🧭 Navigation

### Week 4 Progress:
- [Day 22: File I/O Basics](day22_file_io.md)
- [Day 23: File Operations & NIO](day23_file_operations.md)
- [Day 24: Serialization](day24_serialization.md)
- [Day 25: Multithreading Basics](day25_multithreading_basics.md)
- **Day 26: Thread Synchronization** ← You are here
- [Day 27: Lambda Expressions](day27_lambda_expressions.md)
- [Day 28: Stream API](day28_stream_api.md)
- [Day 29: Date & Time API](day29_date_time_api.md)
- [Day 30: Final Review & Project](day30_final_review.md)

### Related Resources:
- [📝 Day 26 Assessment](../../../java-learning-app/src/data/assessments/java/week4/day26.js)
- [🏠 Back to Week 4 Overview](README.md)
- [📖 Course Overview](../../Java_Core_Fundamentals_30Day_Course.md)

---

## ✅ Day 26 Checklist

Before moving to Day 27, ensure you can:
- [ ] Understand race conditions and their causes
- [ ] Use synchronized methods correctly
- [ ] Use synchronized blocks effectively
- [ ] Implement wait() and notify() for thread communication
- [ ] Understand and avoid deadlock
- [ ] Use volatile keyword appropriately
- [ ] Work with thread-safe collections
- [ ] Implement producer-consumer pattern
- [ ] Understand monitor locks
- [ ] Apply best practices for thread synchronization

---

## ⚠️ Common Mistakes

### 1. synchronized Keyword Mistakes

#### ❌ Wrong - Synchronizing on Primitive or String Literal:
```java
// WRONG - Synchronizing on String literal
public class Main {
    private String lock = "lock";  // String literal - VERY BAD!

    public void method1() {
        synchronized(lock) {  // Any code using "lock" string shares same lock!
            System.out.println("Critical section 1");
        }
    }
}
```
**Issue:** String literals are interned; any code synchronizing on "lock" shares the same lock; causes unintended blocking

#### ✅ Right:
```java
// CORRECT - Use dedicated Object for lock
public class Main {
    private final Object lock = new Object();  // Dedicated lock object

    public void method1() {
        synchronized(lock) {
            System.out.println("Critical section 1");
        }
    }
}
```

**Why:** Dedicated Object ensures only intended code shares the lock; String literals are shared globally (interned).

**💡 Tip:** Always use `new Object()` for locks; never sync on String literals, Integers, or other cached objects.

---

#### ❌ Wrong - Synchronizing on Non-Final Object:
```java
// WRONG - Lock object can be changed
public class Main {
    private Object lock = new Object();  // Not final!

    public void changeLock() {
        lock = new Object();  // Now threads use different locks!
    }

    public void method1() {
        synchronized(lock) {  // Which lock? Could change mid-execution
            System.out.println("Critical section");
        }
    }
}
```
**Issue:** Changing lock object means different threads use different locks; no synchronization

#### ✅ Right:
```java
// CORRECT - Lock object is final
public class Main {
    private final Object lock = new Object();  // Final - can't be changed

    public void method1() {
        synchronized(lock) {
            System.out.println("Critical section");
        }
    }
}
```

**Why:** Final lock ensures all threads always use same lock; prevents accidental lock changes.

**💡 Tip:** Always declare lock objects as `private final Object`.

---

#### ❌ Wrong - Synchronizing Entire Method When Block Suffices:
```java
// WRONG - Over-synchronization
public class Main {
    private int counter = 0;

    public synchronized void processData() {  // Entire method synchronized!
        // Non-critical preprocessing
        System.out.println("Processing...");
        doSomeWork();  // Doesn't need synchronization

        // Only this needs synchronization
        counter++;

        // More non-critical work
        logResults();  // Doesn't need synchronization
    }
}
```
**Issue:** Synchronizing entire method when only small portion needs it; reduces concurrency, poor performance

#### ✅ Right:
```java
// CORRECT - Synchronize only critical section
public class Main {
    private int counter = 0;
    private final Object lock = new Object();

    public void processData() {
        // Non-critical preprocessing (concurrent)
        System.out.println("Processing...");
        doSomeWork();

        // Only critical section synchronized
        synchronized(lock) {
            counter++;
        }

        // More non-critical work (concurrent)
        logResults();
    }
}
```

**Why:** Synchronize only critical sections; maximizes concurrency and performance.

**💡 Tip:** Keep synchronized blocks as small as possible; only protect shared mutable state.

---

#### ❌ Wrong - Forgetting to Synchronize All Access Points:
```java
// WRONG - Inconsistent synchronization
public class Main {
    private int counter = 0;

    public synchronized void increment() {
        counter++;  // Synchronized
    }

    public int getCounter() {
        return counter;  // NOT synchronized! Race condition!
    }
}
```
**Issue:** Read also needs synchronization; otherwise dirty reads possible

#### ✅ Right:
```java
// CORRECT - All access synchronized
public class Main {
    private int counter = 0;

    public synchronized void increment() {
        counter++;
    }

    public synchronized int getCounter() {
        return counter;  // Synchronized read
    }
}
```

**Why:** All access (read and write) to shared mutable state must be synchronized.

**💡 Tip:** Synchronize ALL methods accessing shared mutable state, including getters.

---

#### ❌ Wrong - Synchronizing on this in Public Class:
```java
// WRONG - Synchronizing on this in public class
public class Counter {
    private int count = 0;

    public synchronized void increment() {  // Syncs on this
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}

// External code can break synchronization!
Counter counter = new Counter();
synchronized(counter) {  // External code locks the counter!
    // Holds lock indefinitely - blocks increment/getCount
    Thread.sleep(10000);
}
```
**Issue:** External code can synchronize on your object; breaks your synchronization guarantees

#### ✅ Right:
```java
// CORRECT - Use private lock object
public class Counter {
    private int count = 0;
    private final Object lock = new Object();

    public void increment() {
        synchronized(lock) {  // Private lock - external code can't access
            count++;
        }
    }

    public int getCount() {
        synchronized(lock) {
            return count;
        }
    }
}
```

**Why:** Private lock prevents external interference; encapsulates synchronization.

**💡 Tip:** For public classes, use private lock objects instead of synchronizing on `this`.

---

### 2. Monitor Lock Mistakes

#### ❌ Wrong - Nested Synchronization with Inconsistent Order:
```java
// WRONG - Inconsistent lock ordering causes deadlock
public class Main {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();

    public void method1() {
        synchronized(lock1) {
            synchronized(lock2) {  // Order: lock1 then lock2
                // Critical section
            }
        }
    }

    public void method2() {
        synchronized(lock2) {  // Order: lock2 then lock1 - DEADLOCK!
            synchronized(lock1) {
                // Critical section
            }
        }
    }
}
```
**Issue:** Different lock orders cause deadlock; Thread 1 holds lock1 waiting for lock2, Thread 2 holds lock2 waiting for lock1

#### ✅ Right:
```java
// CORRECT - Consistent lock ordering
public class Main {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();

    public void method1() {
        synchronized(lock1) {  // Always lock1 first
            synchronized(lock2) {  // Then lock2
                // Critical section
            }
        }
    }

    public void method2() {
        synchronized(lock1) {  // Same order: lock1 first
            synchronized(lock2) {  // Then lock2
                // Critical section
            }
        }
    }
}
```

**Why:** Consistent lock ordering prevents circular wait; deadlock impossible.

**💡 Tip:** Always acquire locks in same order across all methods; document lock hierarchy.

---

#### ❌ Wrong - Calling External Method While Holding Lock:
```java
// WRONG - Calling external method in synchronized block
public class Main {
    private int value = 0;

    public synchronized void process(Callback callback) {
        value++;
        callback.onComplete(value);  // External code! Could deadlock or block
    }
}

interface Callback {
    void onComplete(int value);
}
```
**Issue:** External method might synchronize, causing deadlock; or might take long time, holding lock

#### ✅ Right:
```java
// CORRECT - Call external methods outside synchronized block
public class Main {
    private int value = 0;
    private final Object lock = new Object();

    public void process(Callback callback) {
        int currentValue;
        synchronized(lock) {
            value++;
            currentValue = value;
        }
        // Call external method outside lock
        callback.onComplete(currentValue);
    }
}
```

**Why:** External methods unpredictable; calling outside lock prevents deadlock and improves performance.

**💡 Tip:** Never call external/unknown code while holding locks; minimize lock scope.

---

#### ❌ Wrong - Not Understanding Reentrant Locks:
```java
// WRONG - Thinking synchronized is not reentrant
public class Main {
    public synchronized void method1() {
        System.out.println("Method 1");
        method2();  // Student expects deadlock - WRONG!
    }

    public synchronized void method2() {
        System.out.println("Method 2");
    }
}
```
**Issue:** Student doesn't understand intrinsic locks are reentrant; thinks calling synchronized method from synchronized method deadlocks

#### ✅ Right:
```java
// CORRECT - Understanding reentrancy
public class Main {
    public synchronized void method1() {
        System.out.println("Method 1");
        method2();  // OK! Same thread already holds lock (reentrant)
    }

    public synchronized void method2() {
        System.out.println("Method 2");  // Acquires lock again (count = 2)
    }
    // Lock released when count reaches 0
}
```

**Why:** Intrinsic locks are reentrant; same thread can acquire same lock multiple times.

**💡 Tip:** Java's synchronized is reentrant; thread can re-acquire lock it already holds.

---

#### ❌ Wrong - Mixing Static and Instance Synchronization:
```java
// WRONG - Confusing static and instance locks
public class Counter {
    private static int staticCount = 0;
    private int instanceCount = 0;

    public synchronized void incrementInstance() {
        instanceCount++;  // Locks on this (instance)
    }

    public synchronized void incrementBoth() {
        instanceCount++;  // Locks on this (instance)
        staticCount++;    // NOT synchronized! Different threads can modify!
    }
}
```
**Issue:** Instance synchronized method doesn't synchronize static field access

#### ✅ Right:
```java
// CORRECT - Separate locks for static and instance
public class Counter {
    private static int staticCount = 0;
    private int instanceCount = 0;
    private static final Object staticLock = new Object();

    public synchronized void incrementInstance() {
        instanceCount++;  // Synchronized on this
    }

    public void incrementBoth() {
        synchronized(this) {
            instanceCount++;  // Synchronized on this
        }
        synchronized(staticLock) {
            staticCount++;  // Synchronized on class lock
        }
    }

    public static synchronized void incrementStatic() {
        staticCount++;  // Synchronized on Counter.class
    }
}
```

**Why:** Static and instance locks are different; use appropriate lock for each.

**💡 Tip:** Static synchronized uses `Class` lock; instance synchronized uses `this` lock.

---

### 3. wait/notify/notifyAll Mistakes

#### ❌ Wrong - Calling wait() Outside synchronized:
```java
// WRONG - wait() without holding lock
public class Main {
    private final Object lock = new Object();

    public void method1() {
        try {
            lock.wait();  // IllegalMonitorStateException! Not in synchronized block
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
**Issue:** `wait()` requires thread to hold monitor lock; throws IllegalMonitorStateException

#### ✅ Right:
```java
// CORRECT - wait() inside synchronized
public class Main {
    private final Object lock = new Object();

    public void method1() {
        synchronized(lock) {  // Must hold lock first
            try {
                lock.wait();  // OK
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

**Why:** `wait()` releases lock and waits; must hold lock to release it.

**💡 Tip:** Always call `wait()`, `notify()`, `notifyAll()` inside synchronized block on same object.

---

#### ❌ Wrong - Using if Instead of while for wait():
```java
// WRONG - if check, not while
public class Main {
    private boolean ready = false;
    private final Object lock = new Object();

    public void waitForReady() {
        synchronized(lock) {
            if (!ready) {  // WRONG! Should be while
                try {
                    lock.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            // Spurious wakeup! ready might still be false
            processData();
        }
    }
}
```
**Issue:** Spurious wakeups or multiple threads; condition might not be true after wakeup

#### ✅ Right:
```java
// CORRECT - while loop for wait()
public class Main {
    private boolean ready = false;
    private final Object lock = new Object();

    public void waitForReady() {
        synchronized(lock) {
            while (!ready) {  // CORRECT! Loop checks condition again
                try {
                    lock.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            // Guaranteed ready == true here
            processData();
        }
    }

    public void setReady() {
        synchronized(lock) {
            ready = true;
            lock.notifyAll();
        }
    }
}
```

**Why:** While loop re-checks condition after wakeup; handles spurious wakeups and multiple waiters.

**💡 Tip:** Always use `while (!condition) { wait(); }`, never `if`.

---

#### ❌ Wrong - Using notify() Instead of notifyAll():
```java
// WRONG - notify() with multiple waiters
public class Main {
    private Queue<Integer> queue = new LinkedList<>();
    private int capacity = 10;

    public synchronized void put(int value) throws InterruptedException {
        while (queue.size() == capacity) {
            wait();
        }
        queue.add(value);
        notify();  // WRONG! Only wakes ONE waiter - might wake another producer!
    }

    public synchronized int take() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();
        }
        int value = queue.remove();
        notify();  // WRONG! Might wake another consumer, not producer
        return value;
    }
}
```
**Issue:** `notify()` wakes random waiter; might wake wrong type (producer wakes producer, consumer wakes consumer)

#### ✅ Right:
```java
// CORRECT - notifyAll() to wake all waiters
public class Main {
    private Queue<Integer> queue = new LinkedList<>();
    private int capacity = 10;

    public synchronized void put(int value) throws InterruptedException {
        while (queue.size() == capacity) {
            wait();
        }
        queue.add(value);
        notifyAll();  // Wake all waiters (consumers can proceed)
    }

    public synchronized int take() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();
        }
        int value = queue.remove();
        notifyAll();  // Wake all waiters (producers can proceed)
        return value;
    }
}
```

**Why:** `notifyAll()` wakes all waiters; correct thread type will proceed, others re-check and wait.

**💡 Tip:** Prefer `notifyAll()` over `notify()` unless optimization needed and proven safe.

---

#### ❌ Wrong - Not Handling InterruptedException from wait():
```java
// WRONG - Ignoring InterruptedException
public class Main {
    private boolean ready = false;
    private final Object lock = new Object();

    public void waitForReady() {
        synchronized(lock) {
            while (!ready) {
                try {
                    lock.wait();
                } catch (InterruptedException e) {
                    // Empty catch! Ignores interruption
                }
            }
            processData();
        }
    }
}
```
**Issue:** Ignoring interruption; thread doesn't respond to cancel requests

#### ✅ Right:
```java
// CORRECT - Handle interruption properly
public class Main {
    private boolean ready = false;
    private final Object lock = new Object();

    public void waitForReady() throws InterruptedException {
        synchronized(lock) {
            while (!ready) {
                lock.wait();  // Propagate InterruptedException
            }
            processData();
        }
    }

    // OR restore interrupt status
    public void waitForReadyAlternative() {
        synchronized(lock) {
            while (!ready) {
                try {
                    lock.wait();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();  // Restore status
                    return;  // Exit gracefully
                }
            }
            processData();
        }
    }
}
```

**Why:** Proper handling allows cancellation; maintains interrupt semantics.

**💡 Tip:** Propagate InterruptedException or restore interrupt status; never ignore.

---

### 4. Producer-Consumer Pattern Mistakes

#### ❌ Wrong - Fixed-Size Buffer Without Capacity Check:
```java
// WRONG - No capacity limit check
public class Buffer {
    private Queue<Integer> queue = new LinkedList<>();

    public synchronized void produce(int value) {
        queue.add(value);  // No capacity check! Unlimited growth
        notify();
    }

    public synchronized int consume() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();
        }
        return queue.remove();
    }
}
```
**Issue:** Unbounded queue; producer never waits; can cause OutOfMemoryError

#### ✅ Right:
```java
// CORRECT - Bounded buffer with capacity check
public class Buffer {
    private Queue<Integer> queue = new LinkedList<>();
    private int capacity;

    public Buffer(int capacity) {
        this.capacity = capacity;
    }

    public synchronized void produce(int value) throws InterruptedException {
        while (queue.size() == capacity) {  // Wait when full
            wait();
        }
        queue.add(value);
        notifyAll();  // Notify consumers
    }

    public synchronized int consume() throws InterruptedException {
        while (queue.isEmpty()) {  // Wait when empty
            wait();
        }
        int value = queue.remove();
        notifyAll();  // Notify producers
        return value;
    }
}
```

**Why:** Bounded buffer prevents memory exhaustion; producer waits when full.

**💡 Tip:** Always implement capacity limits for producer-consumer buffers.

---

#### ❌ Wrong - Not Using while Loop in Producer-Consumer:
```java
// WRONG - if check instead of while
public class Buffer {
    private Queue<Integer> queue = new LinkedList<>();
    private int capacity;

    public synchronized void produce(int value) throws InterruptedException {
        if (queue.size() == capacity) {  // WRONG! Should be while
            wait();
        }
        // Multiple producers: another producer might have added item
        // while this thread was waking up!
        queue.add(value);  // Might exceed capacity!
        notifyAll();
    }
}
```
**Issue:** With multiple producers/consumers, condition might change before thread proceeds

#### ✅ Right:
```java
// CORRECT - while loop re-checks condition
public class Buffer {
    private Queue<Integer> queue = new LinkedList<>();
    private int capacity;

    public synchronized void produce(int value) throws InterruptedException {
        while (queue.size() == capacity) {  // Loop re-checks
            wait();
        }
        queue.add(value);
        notifyAll();
    }

    public synchronized int consume() throws InterruptedException {
        while (queue.isEmpty()) {  // Loop re-checks
            wait();
        }
        int value = queue.remove();
        notifyAll();
        return value;
    }
}
```

**Why:** While loop handles multiple waiters and spurious wakeups correctly.

**💡 Tip:** Always use `while` loops with `wait()` in producer-consumer pattern.

---

#### ❌ Wrong - Forgetting notifyAll After State Change:
```java
// WRONG - Missing notify after state change
public class Buffer {
    private Queue<Integer> queue = new LinkedList<>();
    private int capacity;

    public synchronized void produce(int value) throws InterruptedException {
        while (queue.size() == capacity) {
            wait();
        }
        queue.add(value);
        // Forgot notifyAll()! Consumers stay blocked forever!
    }

    public synchronized int consume() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();
        }
        int value = queue.remove();
        // Forgot notifyAll()! Producers stay blocked forever!
        return value;
    }
}
```
**Issue:** Waiters never notified; threads wait forever (liveness failure)

#### ✅ Right:
```java
// CORRECT - Always notify after state change
public class Buffer {
    private Queue<Integer> queue = new LinkedList<>();
    private int capacity;

    public synchronized void produce(int value) throws InterruptedException {
        while (queue.size() == capacity) {
            wait();
        }
        queue.add(value);
        notifyAll();  // Wake consumers
    }

    public synchronized int consume() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();
        }
        int value = queue.remove();
        notifyAll();  // Wake producers
        return value;
    }
}
```

**Why:** Notify wakes waiting threads; allows progress after state change.

**💡 Tip:** Always call `notifyAll()` after changing shared state that other threads wait for.

---

#### ❌ Wrong - Not Synchronizing notify/notifyAll:
```java
// WRONG - notify outside synchronized block
public class Main {
    private boolean ready = false;
    private final Object lock = new Object();

    public void setReady() {
        ready = true;
        lock.notifyAll();  // IllegalMonitorStateException! Not in synchronized
    }
}
```
**Issue:** `notify()` and `notifyAll()` require holding monitor lock

#### ✅ Right:
```java
// CORRECT - notify inside synchronized block
public class Main {
    private boolean ready = false;
    private final Object lock = new Object();

    public void setReady() {
        synchronized(lock) {
            ready = true;
            lock.notifyAll();  // OK
        }
    }
}
```

**Why:** Like `wait()`, notify methods require holding monitor lock.

**💡 Tip:** Always call `notify()`/`notifyAll()` inside synchronized block on same object.

---

### 5. Deadlock Mistakes

#### ❌ Wrong - Circular Lock Dependency:
```java
// WRONG - Circular dependency causes deadlock
public class Account {
    private double balance;

    public synchronized void transfer(Account target, double amount) {
        this.balance -= amount;
        // Need to lock target to deposit - DEADLOCK RISK!
        target.deposit(amount);  // Waits for target's lock
    }

    public synchronized void deposit(double amount) {
        this.balance += amount;
    }
}

// Thread 1: account1.transfer(account2, 100)
// Thread 2: account2.transfer(account1, 50)
// Deadlock! Each holds own lock, waiting for other's lock
```
**Issue:** Circular wait; Thread 1 locks A waiting for B, Thread 2 locks B waiting for A

#### ✅ Right:
```java
// CORRECT - Lock ordering prevents deadlock
public class Account {
    private double balance;
    private final int id;

    public Account(int id, double balance) {
        this.id = id;
        this.balance = balance;
    }

    public void transfer(Account target, double amount) {
        // Lock in consistent order (by account ID)
        Account first = this.id < target.id ? this : target;
        Account second = this.id < target.id ? target : this;

        synchronized(first) {
            synchronized(second) {
                this.balance -= amount;
                target.balance += amount;
            }
        }
    }
}
```

**Why:** Consistent lock ordering prevents circular wait; deadlock impossible.

**💡 Tip:** Always acquire locks in consistent order (e.g., by ID, hashCode); prevents circular dependencies.

---

#### ❌ Wrong - Holding Lock While Waiting for External Resource:
```java
// WRONG - Holding lock during I/O or long operation
public class Main {
    private int value = 0;

    public synchronized void processFile() throws IOException {
        value++;
        // Holding lock during file I/O! Blocks all other synchronized methods
        FileReader reader = new FileReader("data.txt");
        int data = reader.read();
        // Long I/O operation while holding lock - BAD!
        reader.close();
    }
}
```
**Issue:** Holding lock during I/O blocks other threads unnecessarily; poor concurrency

#### ✅ Right:
```java
// CORRECT - Release lock before I/O
public class Main {
    private int value = 0;
    private final Object lock = new Object();

    public void processFile() throws IOException {
        synchronized(lock) {
            value++;
        }
        // I/O outside synchronized block
        FileReader reader = new FileReader("data.txt");
        int data = reader.read();
        reader.close();
    }
}
```

**Why:** Release lock before I/O; allows other threads to proceed concurrently.

**💡 Tip:** Never hold locks during I/O, network calls, or other blocking operations.

---

#### ❌ Wrong - Not Understanding Thread.join() Can Cause Deadlock:
```java
// WRONG - join() in synchronized method causes deadlock
public class Main {
    public synchronized void waitForOther(Thread other) {
        try {
            other.join();  // Deadlock if other thread needs this lock!
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

// Thread 1 runs: main.waitForOther(thread2) - holds lock, waits for thread2
// Thread 2 tries: main.someOtherSyncMethod() - waits for lock held by thread1
// Deadlock!
```
**Issue:** Holding lock while joining thread that needs same lock causes deadlock

#### ✅ Right:
```java
// CORRECT - join() outside synchronized
public class Main {
    private boolean done = false;
    private final Object lock = new Object();

    public void waitForOther(Thread other) throws InterruptedException {
        other.join();  // Don't hold any locks while joining
    }

    public void markDone() {
        synchronized(lock) {
            done = true;
        }
    }
}
```

**Why:** Don't hold locks while joining threads; prevents circular dependencies.

**💡 Tip:** Never call `thread.join()` while holding locks; potential deadlock.

---

#### ❌ Wrong - Deadlock with wait() and notify():
```java
// WRONG - Can cause missed notification deadlock
public class Main {
    private boolean ready = false;
    private final Object lock = new Object();

    public void producer() {
        ready = true;  // Changed outside synchronized!
        synchronized(lock) {
            lock.notify();  // Notification before consumer waits!
        }
    }

    public void consumer() throws InterruptedException {
        // If producer runs here, notification is lost!
        synchronized(lock) {
            while (!ready) {
                lock.wait();  // Might miss notification - wait forever
            }
        }
    }
}
```
**Issue:** Lost notification if producer runs before consumer waits; consumer waits forever

#### ✅ Right:
```java
// CORRECT - Change state inside synchronized
public class Main {
    private boolean ready = false;
    private final Object lock = new Object();

    public void producer() {
        synchronized(lock) {
            ready = true;  // Change state inside synchronized
            lock.notifyAll();
        }
    }

    public void consumer() throws InterruptedException {
        synchronized(lock) {
            while (!ready) {
                lock.wait();  // Checks condition; won't miss notification
            }
        }
    }
}
```

**Why:** Changing state and notifying inside synchronized prevents lost notifications.

**💡 Tip:** Always change state and call `notify()` inside same synchronized block.

---

### 6. volatile Keyword Mistakes

#### ❌ Wrong - Using volatile for Compound Operations:
```java
// WRONG - volatile doesn't make compound operations atomic
public class Counter {
    private volatile int count = 0;

    public void increment() {
        count++;  // Not atomic! Read-modify-write = 3 operations
        // Thread 1: read 0
        // Thread 2: read 0
        // Thread 1: write 1
        // Thread 2: write 1
        // Result: 1 (should be 2)
    }
}
```
**Issue:** `volatile` ensures visibility, not atomicity; `count++` is read-modify-write (not atomic)

#### ✅ Right:
```java
// CORRECT - Use synchronized or AtomicInteger
public class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;  // Atomic with synchronization
    }

    // OR use AtomicInteger
    private AtomicInteger atomicCount = new AtomicInteger(0);

    public void incrementAtomic() {
        atomicCount.incrementAndGet();  // Atomic operation
    }
}
```

**Why:** Compound operations need atomicity; use `synchronized` or `AtomicInteger`.

**💡 Tip:** `volatile` for visibility only; use `synchronized` or atomic classes for compound operations.

---

#### ❌ Wrong - Thinking volatile Is Enough for All Cases:
```java
// WRONG - volatile insufficient for check-then-act
public class Singleton {
    private static volatile Singleton instance;

    public static Singleton getInstance() {
        if (instance == null) {  // Check
            instance = new Singleton();  // Act - NOT ATOMIC!
            // Multiple threads can create multiple instances!
        }
        return instance;
    }
}
```
**Issue:** Check-then-act not atomic; multiple threads can pass null check and create multiple instances

#### ✅ Right:
```java
// CORRECT - Use synchronized for check-then-act
public class Singleton {
    private static volatile Singleton instance;

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized(Singleton.class) {
                if (instance == null) {  // Double-check
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

**Why:** Synchronized ensures atomicity of check-then-act; double-check locking optimizes.

**💡 Tip:** Check-then-act patterns need synchronization, not just `volatile`.

---

#### ❌ Wrong - Not Understanding When volatile Is Appropriate:
```java
// WRONG - Using volatile when not needed
public class Main {
    private volatile int a;  // Unnecessary volatile
    private volatile int b;  // Unnecessary volatile

    public synchronized void update(int x, int y) {
        a = x;  // synchronized already ensures visibility
        b = y;  // volatile not needed
    }

    public synchronized int getA() {
        return a;  // synchronized ensures visibility
    }
}
```
**Issue:** Redundant `volatile` when already using `synchronized`; adds overhead for no benefit

#### ✅ Right:
```java
// CORRECT - Use volatile OR synchronized, not both
public class Main {
    private int a;  // No volatile needed with synchronized
    private int b;

    public synchronized void update(int x, int y) {
        a = x;  // synchronized ensures visibility
        b = y;
    }

    public synchronized int getA() {
        return a;
    }

    // OR use volatile without synchronization for simple flag
    private volatile boolean flag;

    public void setFlag() {
        flag = true;  // Simple write - volatile sufficient
    }

    public boolean isFlag() {
        return flag;  // Simple read - volatile sufficient
    }
}
```

**Why:** `synchronized` provides both visibility and atomicity; `volatile` redundant.

**💡 Tip:** Use `volatile` for simple flags with single writes; use `synchronized` for compound operations.

---

#### ❌ Wrong - Forgetting volatile for Double-Check Locking:
```java
// WRONG - Missing volatile in double-check locking
public class Singleton {
    private static Singleton instance;  // Missing volatile!

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized(Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                    // Without volatile, other threads might see partially
                    // constructed instance!
                }
            }
        }
        return instance;
    }
}
```
**Issue:** Without `volatile`, other threads can see partially constructed object

#### ✅ Right:
```java
// CORRECT - volatile for double-check locking
public class Singleton {
    private static volatile Singleton instance;  // volatile required!

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized(Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

**Why:** `volatile` prevents reordering; ensures instance fully constructed before visible.

**💡 Tip:** Double-check locking REQUIRES `volatile` to prevent seeing partial initialization.

---

### 7. Thread-Safe Collection Mistakes

#### ❌ Wrong - Iterating Over Synchronized Collection Without Locking:
```java
// WRONG - Iteration without external synchronization
import java.util.*;

public class Main {
    private List<Integer> list = Collections.synchronizedList(new ArrayList<>());

    public void iterate() {
        // ConcurrentModificationException! Iteration not thread-safe
        for (Integer value : list) {
            System.out.println(value);
        }
    }
}
```
**Issue:** `synchronizedList` doesn't synchronize iteration; ConcurrentModificationException

#### ✅ Right:
```java
// CORRECT - Synchronize iteration manually
import java.util.*;

public class Main {
    private List<Integer> list = Collections.synchronizedList(new ArrayList<>());

    public void iterate() {
        synchronized(list) {  // Must synchronize on list for iteration
            for (Integer value : list) {
                System.out.println(value);
            }
        }
    }

    // OR use CopyOnWriteArrayList (no locking needed for iteration)
    private List<Integer> cowList = new CopyOnWriteArrayList<>();

    public void iterateCOW() {
        for (Integer value : cowList) {  // Safe without synchronization
            System.out.println(value);
        }
    }
}
```

**Why:** Collections.synchronizedList only synchronizes individual operations; iteration needs manual locking.

**💡 Tip:** Always synchronize iteration on synchronized collections; or use CopyOnWriteArrayList.

---

#### ❌ Wrong - Compound Operations on Synchronized Collections:
```java
// WRONG - Check-then-act on synchronized collection
import java.util.*;

public class Main {
    private List<Integer> list = Collections.synchronizedList(new ArrayList<>());

    public void addIfAbsent(Integer value) {
        if (!list.contains(value)) {  // Check
            list.add(value);           // Act - NOT ATOMIC!
            // Another thread can add same value between check and add
        }
    }
}
```
**Issue:** Check-then-act not atomic; race condition

#### ✅ Right:
```java
// CORRECT - Synchronize compound operation
import java.util.*;

public class Main {
    private List<Integer> list = Collections.synchronizedList(new ArrayList<>());

    public void addIfAbsent(Integer value) {
        synchronized(list) {  // Atomic check-then-act
            if (!list.contains(value)) {
                list.add(value);
            }
        }
    }

    // OR use ConcurrentHashMap with putIfAbsent
    private Set<Integer> set = ConcurrentHashMap.newKeySet();

    public void addIfAbsentConcurrent(Integer value) {
        set.add(value);  // Built-in atomic operation
    }
}
```

**Why:** Compound operations need explicit synchronization; or use concurrent collections with atomic operations.

**💡 Tip:** Synchronize compound operations on synchronized collections; prefer concurrent collections.

---

#### ❌ Wrong - Using Wrong Collection Type:
```java
// WRONG - Using ArrayList for concurrent access
import java.util.*;

public class Main {
    private List<Integer> list = new ArrayList<>();  // NOT thread-safe!

    public void add(Integer value) {
        list.add(value);  // Race condition! Multiple threads = corruption
    }
}
```
**Issue:** ArrayList not thread-safe; concurrent access causes corruption

#### ✅ Right:
```java
// CORRECT - Use thread-safe collection
import java.util.*;
import java.util.concurrent.*;

public class Main {
    // Option 1: Synchronized wrapper
    private List<Integer> syncList = Collections.synchronizedList(new ArrayList<>());

    // Option 2: Concurrent collection (better performance)
    private List<Integer> cowList = new CopyOnWriteArrayList<>();

    // Option 3: For unique elements
    private Set<Integer> concurrentSet = ConcurrentHashMap.newKeySet();

    public void add(Integer value) {
        cowList.add(value);  // Thread-safe
    }
}
```

**Why:** Use thread-safe collections for concurrent access; choose based on use case.

**💡 Tip:** Synchronized wrappers for basic thread-safety; concurrent collections for better performance.

---

#### ❌ Wrong - Modifying Collection During Iteration:
```java
// WRONG - Removing during iteration
import java.util.*;

public class Main {
    private List<Integer> list = new CopyOnWriteArrayList<>();

    public void removeEven() {
        for (Integer value : list) {
            if (value % 2 == 0) {
                list.remove(value);  // ConcurrentModificationException with ArrayList!
                // Even CopyOnWriteArrayList: remove doesn't affect snapshot iterator
            }
        }
    }
}
```
**Issue:** Removing during iteration causes exception (ArrayList) or doesn't work (CopyOnWriteArrayList)

#### ✅ Right:
```java
// CORRECT - Use Iterator.remove() or collect-then-remove
import java.util.*;
import java.util.concurrent.*;

public class Main {
    private List<Integer> list = new CopyOnWriteArrayList<>();

    // Option 1: Use Iterator.remove()
    public void removeEvenWithIterator() {
        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            Integer value = it.next();
            if (value % 2 == 0) {
                it.remove();  // Safe removal
            }
        }
    }

    // Option 2: Collect then removeAll
    public void removeEvenWithRemoveAll() {
        List<Integer> toRemove = new ArrayList<>();
        for (Integer value : list) {
            if (value % 2 == 0) {
                toRemove.add(value);
            }
        }
        list.removeAll(toRemove);
    }

    // Option 3: removeIf (Java 8+)
    public void removeEvenWithRemoveIf() {
        list.removeIf(value -> value % 2 == 0);
    }
}
```

**Why:** Iterator.remove() is safe; or collect items then remove; or use removeIf.

**💡 Tip:** Use `Iterator.remove()` or `removeIf()` for safe removal during iteration.

---

### 8. Atomicity Mistakes

#### ❌ Wrong - Assuming 64-bit Operations Are Atomic:
```java
// WRONG - long/double writes not atomic without volatile
public class Main {
    private long counter = 0;  // 64-bit - NOT atomic!

    public void increment() {
        counter++;  // Read-modify-write on 64-bit value = NOT ATOMIC!
        // Thread can see partial updates (32 bits at a time)
    }

    public long getCounter() {
        return counter;  // Read of 64-bit value not atomic either!
    }
}
```
**Issue:** 64-bit operations (long/double) not atomic without `volatile` or synchronization

#### ✅ Right:
```java
// CORRECT - Synchronize or use volatile
public class Main {
    private volatile long counter = 0;  // volatile makes reads/writes atomic

    public synchronized void increment() {
        counter++;  // Synchronized for atomicity of compound operation
    }

    public long getCounter() {
        return counter;  // volatile ensures atomic read
    }

    // OR use AtomicLong
    private AtomicLong atomicCounter = new AtomicLong(0);

    public void incrementAtomic() {
        atomicCounter.incrementAndGet();  // Atomic
    }
}
```

**Why:** 64-bit operations need `volatile` or synchronization for atomicity; or use atomic classes.

**💡 Tip:** Always use `volatile` for long/double fields; or synchronize; or use atomic classes.

---

#### ❌ Wrong - Multiple Separate Atomic Operations:
```java
// WRONG - Separate atomic operations don't compose atomically
import java.util.concurrent.atomic.*;

public class Main {
    private AtomicInteger a = new AtomicInteger(0);
    private AtomicInteger b = new AtomicInteger(0);

    public void update() {
        a.incrementAndGet();  // Atomic
        b.incrementAndGet();  // Atomic
        // But a and b not updated atomically together!
        // Other threads can see inconsistent state
    }
}
```
**Issue:** Individual operations atomic but composition is not; other threads see intermediate state

#### ✅ Right:
```java
// CORRECT - Synchronize compound operation
public class Main {
    private int a = 0;
    private int b = 0;
    private final Object lock = new Object();

    public void update() {
        synchronized(lock) {  // Both updates atomic together
            a++;
            b++;
        }
    }

    // OR use single atomic operation if possible
    private AtomicInteger sum = new AtomicInteger(0);

    public void updateSum() {
        sum.addAndGet(2);  // Single atomic operation
    }
}
```

**Why:** Multiple atomic operations don't compose; synchronize to make compound operation atomic.

**💡 Tip:** Synchronize when updating multiple related fields atomically.

---

#### ❌ Wrong - Not Understanding AtomicReference vs volatile:
```java
// WRONG - Using AtomicReference for compound operations
import java.util.concurrent.atomic.*;

public class Main {
    private AtomicReference<String> name = new AtomicReference<>("John");

    public void changeName(String newName) {
        String current = name.get();  // Read
        if (current.equals("John")) {  // Check
            name.set(newName);         // Act - NOT ATOMIC!
            // Another thread can change name between check and set
        }
    }
}
```
**Issue:** Check-then-act not atomic even with AtomicReference

#### ✅ Right:
```java
// CORRECT - Use compareAndSet for atomic check-then-act
import java.util.concurrent.atomic.*;

public class Main {
    private AtomicReference<String> name = new AtomicReference<>("John");

    public void changeName(String newName) {
        // Atomic check-then-act
        name.compareAndSet("John", newName);
        // Returns true if successfully changed, false if "John" not current value
    }

    // OR loop until successful
    public void changeNameLoop(String newName) {
        String current;
        do {
            current = name.get();
            if (!current.equals("John")) {
                break;  // Don't change if not "John"
            }
        } while (!name.compareAndSet(current, newName));
    }
}
```

**Why:** `compareAndSet()` provides atomic check-then-act; use for atomic updates.

**💡 Tip:** Use `compareAndSet()` for atomic conditional updates; not separate get/check/set.

---

#### ❌ Wrong - Race Condition in Lazy Initialization:
```java
// WRONG - Race condition in lazy initialization
public class Main {
    private ExpensiveObject instance;

    public ExpensiveObject getInstance() {
        if (instance == null) {  // Check
            instance = new ExpensiveObject();  // Act - NOT ATOMIC!
            // Multiple threads can create multiple instances
        }
        return instance;
    }
}
```
**Issue:** Check-then-act race condition; multiple threads can create multiple instances

#### ✅ Right:
```java
// CORRECT - Synchronized lazy initialization
public class Main {
    private ExpensiveObject instance;

    public synchronized ExpensiveObject getInstance() {
        if (instance == null) {  // Atomic check-then-act
            instance = new ExpensiveObject();
        }
        return instance;
    }

    // OR use holder pattern (thread-safe by JVM)
    private static class Holder {
        static final ExpensiveObject INSTANCE = new ExpensiveObject();
    }

    public static ExpensiveObject getInstanceHolder() {
        return Holder.INSTANCE;  // Thread-safe by class loading semantics
    }
}
```

**Why:** Synchronization makes check-then-act atomic; holder pattern uses class loading guarantee.

**💡 Tip:** Synchronize lazy initialization or use holder pattern for thread-safe singleton.

---

### 9. Synchronization Scope Mistakes

#### ❌ Wrong - Over-Synchronization:
```java
// WRONG - Synchronizing too much
public class Main {
    public synchronized void processData(List<Integer> data) {
        // Entire method synchronized - even non-critical parts!
        System.out.println("Processing...");
        doLogging();  // Doesn't need synchronization

        // Only this needs synchronization
        sharedState.update(data);

        saveResults();  // Doesn't need synchronization
    }
}
```
**Issue:** Synchronizing entire method reduces concurrency; poor performance

#### ✅ Right:
```java
// CORRECT - Synchronize only critical section
public class Main {
    private final Object lock = new Object();

    public void processData(List<Integer> data) {
        System.out.println("Processing...");
        doLogging();

        // Only critical section synchronized
        synchronized(lock) {
            sharedState.update(data);
        }

        saveResults();
    }
}
```

**Why:** Minimize synchronized scope; maximize concurrency and performance.

**💡 Tip:** Keep synchronized blocks as small as possible; synchronize only shared mutable state.

---

#### ❌ Wrong - Under-Synchronization:
```java
// WRONG - Not synchronizing related fields together
public class Main {
    private int numerator = 0;
    private int denominator = 1;

    public synchronized void setNumerator(int n) {
        numerator = n;  // Synchronized
    }

    public synchronized void setDenominator(int d) {
        denominator = d;  // Synchronized
    }

    public double getValue() {
        return (double) numerator / denominator;  // NOT synchronized!
        // Can read inconsistent state: numerator from one update,
        // denominator from another
    }
}
```
**Issue:** Related fields not updated/read atomically; inconsistent state visible

#### ✅ Right:
```java
// CORRECT - Synchronize all access to related fields
public class Main {
    private int numerator = 0;
    private int denominator = 1;

    public synchronized void setNumerator(int n) {
        numerator = n;
    }

    public synchronized void setDenominator(int d) {
        if (d == 0) throw new IllegalArgumentException("Denominator can't be 0");
        denominator = d;
    }

    public synchronized double getValue() {
        return (double) numerator / denominator;  // Consistent read
    }

    // OR update both together
    public synchronized void setFraction(int n, int d) {
        if (d == 0) throw new IllegalArgumentException("Denominator can't be 0");
        this.numerator = n;
        this.denominator = d;
    }
}
```

**Why:** Related fields must be updated/read atomically; synchronize all access.

**💡 Tip:** Identify related fields that must be consistent; synchronize all access together.

---

#### ❌ Wrong - Synchronizing on Wrong Object:
```java
// WRONG - Synchronizing on local variable
public class Main {
    private int counter = 0;

    public void increment() {
        Object lock = new Object();  // New object each time!
        synchronized(lock) {  // Each thread has different lock!
            counter++;  // No synchronization!
        }
    }
}
```
**Issue:** Each invocation creates new lock; no actual synchronization

#### ✅ Right:
```java
// CORRECT - Synchronize on shared object
public class Main {
    private int counter = 0;
    private final Object lock = new Object();  // Shared lock

    public void increment() {
        synchronized(lock) {  // All threads use same lock
            counter++;
        }
    }
}
```

**Why:** All threads must synchronize on same object for mutual exclusion.

**💡 Tip:** Lock object must be shared and immutable (final); never local variable.

---

#### ❌ Wrong - Not Synchronizing Setter When Getter Is Synchronized:
```java
// WRONG - Inconsistent synchronization
public class Main {
    private int value = 0;

    public void setValue(int value) {
        this.value = value;  // NOT synchronized!
    }

    public synchronized int getValue() {
        return value;  // Synchronized
    }
}
```
**Issue:** Inconsistent synchronization; race condition still possible

#### ✅ Right:
```java
// CORRECT - Consistent synchronization
public class Main {
    private int value = 0;

    public synchronized void setValue(int value) {
        this.value = value;  // Synchronized
    }

    public synchronized int getValue() {
        return value;  // Synchronized
    }
}
```

**Why:** All access to shared mutable state must be synchronized; both reads and writes.

**💡 Tip:** Synchronize ALL access (getters and setters) to shared mutable state.

---

### 10. Advanced Synchronization Mistakes

#### ❌ Wrong - Broken Double-Checked Locking:
```java
// WRONG - Broken double-checked locking
public class Singleton {
    private static Singleton instance;  // Missing volatile!

    public static Singleton getInstance() {
        if (instance == null) {  // First check (no locking)
            synchronized(Singleton.class) {
                if (instance == null) {  // Second check (with locking)
                    instance = new Singleton();
                    // Without volatile, reordering can happen:
                    // 1. Allocate memory
                    // 2. Set instance to memory (before construction!)
                    // 3. Call constructor
                    // Other threads see partially constructed object!
                }
            }
        }
        return instance;
    }
}
```
**Issue:** Without `volatile`, instruction reordering can expose partially constructed object

#### ✅ Right:
```java
// CORRECT - Proper double-checked locking with volatile
public class Singleton {
    private static volatile Singleton instance;  // volatile required!

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized(Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }

    // OR use holder pattern (simpler, guaranteed correct)
    private static class Holder {
        static final Singleton INSTANCE = new Singleton();
    }

    public static Singleton getInstanceHolder() {
        return Holder.INSTANCE;
    }
}
```

**Why:** `volatile` prevents reordering; ensures instance fully constructed before visible.

**💡 Tip:** Double-check locking REQUIRES `volatile`; or use holder pattern (simpler, faster).

---

#### ❌ Wrong - Static Field Initialization Race:
```java
// WRONG - Race condition in static initialization
public class Main {
    private static Map<String, String> cache;

    static {
        cache = new HashMap<>();  // Thread 1 might see null
        // Thread 2 might start using cache before fully initialized
        loadCache();
    }

    private static void loadCache() {
        cache.put("key1", "value1");
        cache.put("key2", "value2");
        // If multiple threads trigger class loading, race condition!
    }
}
```
**Issue:** Static initialization not synchronized; race conditions possible if multiple threads trigger loading

#### ✅ Right:
```java
// CORRECT - Class initialization is thread-safe by JVM
public class Main {
    // JVM guarantees thread-safe initialization
    private static final Map<String, String> cache = initCache();

    private static Map<String, String> initCache() {
        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");
        map.put("key2", "value2");
        return map;
    }

    // OR use holder pattern
    private static class CacheHolder {
        static final Map<String, String> CACHE;
        static {
            CACHE = new HashMap<>();
            CACHE.put("key1", "value1");
            CACHE.put("key2", "value2");
        }
    }
}
```

**Why:** JVM guarantees static initialization happens-before any access; thread-safe.

**💡 Tip:** Use static final fields for thread-safe singleton initialization; JVM guarantees safety.

---

#### ❌ Wrong - Not Understanding Static vs Instance Locks:
```java
// WRONG - Confusing static and instance synchronization
public class Counter {
    private static int staticCount = 0;
    private int instanceCount = 0;

    public synchronized void incrementBoth() {  // Syncs on this (instance)
        staticCount++;    // NOT protected! Different threads can modify
        instanceCount++;  // Protected by instance lock
    }

    public synchronized static void incrementStatic() {  // Syncs on Counter.class
        staticCount++;  // Protected by class lock
    }
}
```
**Issue:** Instance method doesn't protect static field; different locks

#### ✅ Right:
```java
// CORRECT - Separate locks for static and instance
public class Counter {
    private static int staticCount = 0;
    private int instanceCount = 0;

    public void incrementBoth() {
        // Instance lock for instance field
        synchronized(this) {
            instanceCount++;
        }
        // Class lock for static field
        synchronized(Counter.class) {
            staticCount++;
        }
    }

    public synchronized static void incrementStatic() {
        staticCount++;  // Protected by Counter.class lock
    }

    public synchronized void incrementInstance() {
        instanceCount++;  // Protected by this lock
    }
}
```

**Why:** Static synchronized uses class lock; instance synchronized uses instance lock; different locks.

**💡 Tip:** Static fields need class-level lock; instance fields need instance-level lock.

---

#### ❌ Wrong - Thread-Local Misuse:
```java
// WRONG - Using ThreadLocal for shared state
public class Main {
    private static ThreadLocal<Integer> counter = ThreadLocal.withInitial(() -> 0);

    public void increment() {
        counter.set(counter.get() + 1);  // Each thread has separate counter!
    }

    public int getTotal() {
        return counter.get();  // Only sees current thread's count, not total!
    }
}
```
**Issue:** ThreadLocal creates separate copy per thread; not for aggregating across threads

#### ✅ Right:
```java
// CORRECT - Use ThreadLocal for per-thread state only
public class Main {
    private static ThreadLocal<DateFormat> formatter =
        ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));

    public String formatDate(Date date) {
        // Each thread has own DateFormat instance (DateFormat not thread-safe)
        return formatter.get().format(date);
    }

    // For shared counter across threads, use AtomicInteger
    private static AtomicInteger counter = new AtomicInteger(0);

    public void increment() {
        counter.incrementAndGet();  // Shared across all threads
    }

    public int getTotal() {
        return counter.get();  // Total across all threads
    }
}
```

**Why:** ThreadLocal for per-thread state (e.g., non-thread-safe objects); not for shared aggregation.

**💡 Tip:** Use ThreadLocal for per-thread instances of non-thread-safe classes; not for shared counters.

---

#### ❌ Wrong - Not Closing Resources in synchronized Block:
```java
// WRONG - Resource leak if exception in synchronized block
public class Main {
    private final Object lock = new Object();

    public void processFile() throws IOException {
        FileReader reader = new FileReader("data.txt");
        synchronized(lock) {
            int data = reader.read();
            // If exception here, reader never closed!
            processData(data);
        }
        reader.close();  // Might not reach here!
    }
}
```
**Issue:** Exception in synchronized block can prevent resource cleanup

#### ✅ Right:
```java
// CORRECT - Use try-finally or try-with-resources
public class Main {
    private final Object lock = new Object();

    public void processFile() throws IOException {
        try (FileReader reader = new FileReader("data.txt")) {
            int data;
            synchronized(lock) {
                data = reader.read();
                processData(data);
            }
        }
        // reader closed automatically even if exception
    }
}
```

**Why:** Try-with-resources ensures cleanup even if exception; or use try-finally.

**💡 Tip:** Always use try-with-resources for resource management, even in synchronized code.

---

This comprehensive list contains **40+ Thread Synchronization mistakes** covering all fundamental concepts!

---

**🎉 Congratulations on completing Day 26!**

You've mastered thread synchronization in Java. Tomorrow, we'll explore lambda expressions and functional programming.

**Next**: [Day 27: Lambda Expressions →](day27_lambda_expressions.md)

---

*Last Updated: 2026-01-09*