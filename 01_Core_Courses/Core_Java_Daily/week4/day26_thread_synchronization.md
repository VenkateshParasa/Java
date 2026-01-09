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

**🎉 Congratulations on completing Day 26!**

You've mastered thread synchronization in Java. Tomorrow, we'll explore lambda expressions and functional programming.

**Next**: [Day 27: Lambda Expressions →](day27_lambda_expressions.md)

---

*Last Updated: 2026-01-09*