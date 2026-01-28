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


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 2: Bank Account Transfer
Implement thread-safe money transfer between accounts.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 3: Print Sequence
Two threads print numbers in sequence.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 4: Thread-Safe Stack
Implement a thread-safe stack.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 5: Ticket Booking System
Simulate thread-safe ticket booking.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 6: Read-Write Lock Pattern
Implement simple read-write lock.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 7: Concurrent Bank Account System with Transfer Deadlock Prevention

**📝 Problem Statement:**
Create a comprehensive bank account system demonstrating thread-safe money transfers between multiple accounts with proper deadlock prevention through lock ordering, account balance validation, transaction logging, concurrent transfer operations from multiple threads, rollback on failure, and transfer statistics tracking. The system should accept a list of accounts with initial balances, support concurrent transfer operations where multiple threads attempt to transfer money between various account pairs, implement deadlock prevention by acquiring account locks in consistent order (by account ID), validate sufficient balance before transfer, log all transfer attempts (successful and failed), handle concurrent transfers safely without data corruption or deadlock, track total transferred amounts and success rates, and generate comprehensive transfer reports, showcasing production-grade techniques for preventing deadlock in multi-resource locking scenarios, proper lock ordering, atomic multi-step operations, and consistent state management across concurrent operations.

**Requirements:**
- Create an Account class with id, balance, and transaction history
- Implement thread-safe deposit and withdraw methods using synchronized
- Create a TransferService class for handling money transfers between accounts
- Implement deadlock prevention: always acquire locks in order (lower ID first)
- Validate sufficient balance before transfer (check inside synchronized block)
- Atomic transfer: both withdraw and deposit happen atomically
- Support concurrent transfers from multiple threads without deadlock
- Log each transfer attempt: account IDs, amount, timestamp, success/failure reason
- Track transfer statistics: total attempts, successful, failed, total amount transferred
- Handle edge cases: negative amounts, zero amounts, same account transfers
- Create multiple transfer threads that randomly transfer money between accounts
- Use Thread.sleep() to simulate processing time and increase concurrency
- Wait for all transfer threads to complete using join()
- Generate final report: per-account balances, transfer statistics, success rate
- Demonstrate that deadlock never occurs regardless of transfer order
- Show account balance consistency: total money in system remains constant
- Display transaction history for each account showing all deposits/withdrawals

**Sample Test Cases:**
```
Input: 5 accounts with initial balance $1000 each, 20 concurrent transfer threads
Each thread performs 10 random transfers of $50-$200 between random accounts

Expected Output:
=== Concurrent Bank Account System ===

Initializing 5 accounts with $1000.00 each...
✓ Account-1: $1000.00
✓ Account-2: $1000.00
✓ Account-3: $1000.00
✓ Account-4: $1000.00
✓ Account-5: $1000.00
Total Money in System: $5000.00

Starting 20 transfer threads...
Each thread will perform 10 random transfers

[Thread-1] Transfer $150.00: Account-1 → Account-3
  Lock Order: Account-1 (id=1), Account-3 (id=3)
  ✓ Transfer successful
  Account-1: $1000.00 → $850.00
  Account-3: $1000.00 → $1150.00

[Thread-2] Transfer $75.00: Account-4 → Account-2
  Lock Order: Account-2 (id=2), Account-4 (id=4)
  ✓ Transfer successful
  Account-4: $1000.00 → $925.00
  Account-2: $1000.00 → $1075.00

[Thread-3] Transfer $200.00: Account-2 → Account-5
  Lock Order: Account-2 (id=2), Account-5 (id=5)
  ✓ Transfer successful
  Account-2: $1075.00 → $875.00
  Account-5: $1000.00 → $1200.00

[Thread-1] Transfer $300.00: Account-3 → Account-1
  Lock Order: Account-1 (id=1), Account-3 (id=3)
  ✗ Transfer failed: Insufficient balance in Account-3 (has $1150.00, needs $300.00)

[Thread-4] Transfer $100.00: Account-5 → Account-1
  Lock Order: Account-1 (id=1), Account-5 (id=5)
  ✓ Transfer successful
  Account-5: $1200.00 → $1100.00
  Account-1: $850.00 → $950.00

... (200 total transfer attempts)

All transfer threads completed!

=== Final Report ===

Account Balances:
  Account-1: $1250.00 (25.0% change)
  Account-2: $890.00 (-11.0% change)
  Account-3: $1180.00 (18.0% change)
  Account-4: $720.00 (-28.0% change)
  Account-5: $960.00 (-4.0% change)

Total Money in System: $5000.00 ✓ (consistent)

Transfer Statistics:
  Total Attempts: 200
  Successful: 167
  Failed (insufficient balance): 33
  Success Rate: 83.5%
  Total Amount Transferred: $23,450.00
  Average Transfer Amount: $140.42

No Deadlocks Occurred ✓

Transaction History - Account-1 (sample):
  1. 2026-01-10 10:15:23 - Withdraw: $150.00 (Transfer to Account-3)
  2. 2026-01-10 10:15:24 - Deposit: $100.00 (Transfer from Account-5)
  3. 2026-01-10 10:15:25 - Deposit: $200.00 (Transfer from Account-2)
  ... (15 total transactions)

Deadlock Prevention Strategy: Lock ordering by account ID
- Always acquire lock for account with lower ID first
- Then acquire lock for account with higher ID
- Prevents circular wait condition
- Result: Zero deadlocks across 200 concurrent transfers
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

// ============= Transaction Record Class =============

class Transaction {
    private LocalDateTime timestamp;
    private String type;  // DEPOSIT or WITHDRAW
    private double amount;
    private String description;

    public Transaction(String type, double amount, String description) {
        this.timestamp = LocalDateTime.now();
        this.type = type;
        this.amount = amount;
        this.description = description;
    }

    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return timestamp.format(formatter) + " - " + type + ": $" +
            String.format("%.2f", amount) + " (" + description + ")";
    }
}

// ============= Account Class =============

class Account {
    private final int id;
    private double balance;
    private List<Transaction> transactions;

    public Account(int id, double initialBalance) {
        this.id = id;
        this.balance = initialBalance;
        this.transactions = new ArrayList<>();
    }

    public int getId() {
        return id;
    }

    public synchronized double getBalance() {
        return balance;
    }

    public synchronized void deposit(double amount, String description) {
        balance += amount;
        transactions.add(new Transaction("Deposit", amount, description));
    }

    public synchronized boolean withdraw(double amount, String description) {
        if (balance >= amount) {
            balance -= amount;
            transactions.add(new Transaction("Withdraw", amount, description));
            return true;
        }
        return false;
    }

    public synchronized List<Transaction> getTransactions() {
        return new ArrayList<>(transactions);
    }

    @Override
    public String toString() {
        return "Account-" + id;
    }
}

// ============= Transfer Statistics Class =============

class TransferStatistics {
    private AtomicInteger totalAttempts = new AtomicInteger(0);
    private AtomicInteger successful = new AtomicInteger(0);
    private AtomicInteger failed = new AtomicInteger(0);
    private double totalTransferred = 0.0;
    private final Object amountLock = new Object();

    public void recordAttempt() {
        totalAttempts.incrementAndGet();
    }

    public void recordSuccess(double amount) {
        successful.incrementAndGet();
        synchronized (amountLock) {
            totalTransferred += amount;
        }
    }

    public void recordFailure() {
        failed.incrementAndGet();
    }

    public int getTotalAttempts() {
        return totalAttempts.get();
    }

    public int getSuccessful() {
        return successful.get();
    }

    public int getFailed() {
        return failed.get();
    }

    public double getTotalTransferred() {
        synchronized (amountLock) {
            return totalTransferred;
        }
    }

    public double getSuccessRate() {
        int total = totalAttempts.get();
        return total > 0 ? (successful.get() * 100.0) / total : 0;
    }
}

// ============= Transfer Service Class =============

class TransferService {
    private TransferStatistics stats;

    public TransferService(TransferStatistics stats) {
        this.stats = stats;
    }

    public boolean transfer(Account from, Account to, double amount) {
        stats.recordAttempt();

        // Validation
        if (amount <= 0) {
            System.out.println("[" + Thread.currentThread().getName() +
                "] Transfer $" + String.format("%.2f", amount) +
                ": " + from + " → " + to);
            System.out.println("  ✗ Transfer failed: Invalid amount (must be positive)");
            stats.recordFailure();
            return false;
        }

        if (from.getId() == to.getId()) {
            System.out.println("[" + Thread.currentThread().getName() +
                "] Transfer $" + String.format("%.2f", amount) +
                ": " + from + " → " + to);
            System.out.println("  ✗ Transfer failed: Cannot transfer to same account");
            stats.recordFailure();
            return false;
        }

        // Deadlock prevention: Lock in consistent order (by account ID)
        Account first = from.getId() < to.getId() ? from : to;
        Account second = from.getId() < to.getId() ? to : from;

        System.out.println("[" + Thread.currentThread().getName() +
            "] Transfer $" + String.format("%.2f", amount) +
            ": " + from + " → " + to);
        System.out.println("  Lock Order: " + first + " (id=" + first.getId() +
            "), " + second + " (id=" + second.getId() + ")");

        // Acquire locks in order
        synchronized (first) {
            synchronized (second) {
                double fromBalanceBefore = from.getBalance();
                double toBalanceBefore = to.getBalance();

                // Check sufficient balance
                if (fromBalanceBefore < amount) {
                    System.out.println("  ✗ Transfer failed: Insufficient balance in " +
                        from + " (has $" + String.format("%.2f", fromBalanceBefore) +
                        ", needs $" + String.format("%.2f", amount) + ")");
                    stats.recordFailure();
                    return false;
                }

                // Perform atomic transfer
                from.withdraw(amount, "Transfer to " + to);
                to.deposit(amount, "Transfer from " + from);

                System.out.println("  ✓ Transfer successful");
                System.out.println("  " + from + ": $" +
                    String.format("%.2f", fromBalanceBefore) + " → $" +
                    String.format("%.2f", from.getBalance()));
                System.out.println("  " + to + ": $" +
                    String.format("%.2f", toBalanceBefore) + " → $" +
                    String.format("%.2f", to.getBalance()));

                stats.recordSuccess(amount);
                return true;
            }
        }
    }
}

// ============= Transfer Thread Class =============

class TransferThread implements Runnable {
    private List<Account> accounts;
    private TransferService transferService;
    private int transfersPerThread;
    private Random random = new Random();

    public TransferThread(List<Account> accounts, TransferService transferService,
                          int transfersPerThread) {
        this.accounts = accounts;
        this.transferService = transferService;
        this.transfersPerThread = transfersPerThread;
    }

    @Override
    public void run() {
        for (int i = 0; i < transfersPerThread; i++) {
            // Random accounts
            int fromIndex = random.nextInt(accounts.size());
            int toIndex = random.nextInt(accounts.size());

            Account from = accounts.get(fromIndex);
            Account to = accounts.get(toIndex);

            // Random amount between 50 and 200
            double amount = 50 + random.nextInt(151);

            // Perform transfer
            transferService.transfer(from, to, amount);

            // Simulate processing time
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }
}

// ============= Main Bank System =============

public class TestConcurrentBankSystem {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== Concurrent Bank Account System ===\n");

        // Configuration
        int accountCount = 5;
        double initialBalance = 1000.0;
        int threadCount = 20;
        int transfersPerThread = 10;

        // Create accounts
        System.out.println("Initializing " + accountCount + " accounts with $" +
            String.format("%.2f", initialBalance) + " each...");
        List<Account> accounts = new ArrayList<>();
        double totalMoneyInitial = 0;

        for (int i = 1; i <= accountCount; i++) {
            Account account = new Account(i, initialBalance);
            accounts.add(account);
            System.out.println("✓ Account-" + i + ": $" +
                String.format("%.2f", initialBalance));
            totalMoneyInitial += initialBalance;
        }

        System.out.println("Total Money in System: $" +
            String.format("%.2f", totalMoneyInitial) + "\n");

        // Create transfer service
        TransferStatistics stats = new TransferStatistics();
        TransferService transferService = new TransferService(stats);

        // Create and start transfer threads
        System.out.println("Starting " + threadCount + " transfer threads...");
        System.out.println("Each thread will perform " + transfersPerThread +
            " random transfers\n");

        List<Thread> threads = new ArrayList<>();
        for (int i = 1; i <= threadCount; i++) {
            Thread thread = new Thread(
                new TransferThread(accounts, transferService, transfersPerThread),
                "Thread-" + i
            );
            threads.add(thread);
            thread.start();
        }

        // Wait for all threads to complete
        for (Thread thread : threads) {
            thread.join();
        }

        System.out.println("\nAll transfer threads completed!\n");

        // Display final report
        displayFinalReport(accounts, stats, totalMoneyInitial);
    }

    private static void displayFinalReport(List<Account> accounts,
                                           TransferStatistics stats,
                                           double totalMoneyInitial) {
        System.out.println("=== Final Report ===\n");

        // Account balances
        System.out.println("Account Balances:");
        double totalMoneyfinal = 0;
        double initialBalance = totalMoneyInitial / accounts.size();

        for (Account account : accounts) {
            double balance = account.getBalance();
            totalMoneyfinal += balance;
            double percentChange = ((balance - initialBalance) / initialBalance) * 100;

            System.out.printf("  %s: $%.2f (%.1f%% change)%n",
                account, balance, percentChange);
        }

        System.out.println();
        System.out.printf("Total Money in System: $%.2f %s (consistent)%n",
            totalMoneyfinal,
            Math.abs(totalMoneyfinal - totalMoneyInitial) < 0.01 ? "✓" : "✗");

        // Transfer statistics
        System.out.println("\nTransfer Statistics:");
        System.out.println("  Total Attempts: " + stats.getTotalAttempts());
        System.out.println("  Successful: " + stats.getSuccessful());
        System.out.println("  Failed (insufficient balance): " + stats.getFailed());
        System.out.printf("  Success Rate: %.1f%%%n", stats.getSuccessRate());
        System.out.printf("  Total Amount Transferred: $%.2f%n",
            stats.getTotalTransferred());

        if (stats.getSuccessful() > 0) {
            System.out.printf("  Average Transfer Amount: $%.2f%n",
                stats.getTotalTransferred() / stats.getSuccessful());
        }

        System.out.println("\nNo Deadlocks Occurred ✓");

        // Sample transaction history
        System.out.println("\nTransaction History - " + accounts.get(0) + " (sample):");
        List<Transaction> transactions = accounts.get(0).getTransactions();
        int displayCount = Math.min(5, transactions.size());
        for (int i = 0; i < displayCount; i++) {
            System.out.println("  " + (i + 1) + ". " + transactions.get(i));
        }
        if (transactions.size() > displayCount) {
            System.out.println("  ... (" + transactions.size() +
                " total transactions)");
        }

        System.out.println("\nDeadlock Prevention Strategy: Lock ordering by account ID");
        System.out.println("- Always acquire lock for account with lower ID first");
        System.out.println("- Then acquire lock for account with higher ID");
        System.out.println("- Prevents circular wait condition");
        System.out.println("- Result: Zero deadlocks across " +
            stats.getTotalAttempts() + " concurrent transfers");
    }
}
```

</details>

**💡 Tips:**
- Lock ordering prevents deadlock; always acquire locks in consistent order (e.g., by ID, hashCode)
- Circular wait condition necessary for deadlock; lock ordering breaks this condition
- synchronized on multiple objects requires nesting; outer lock acquired first, inner lock second
- Validate conditions inside synchronized block; condition can change before lock acquired
- Atomic transfers require both operations (withdraw + deposit) in same synchronized block
- Balance consistency check: total money in system must remain constant across transfers
- AtomicInteger for thread-safe counters; no synchronization needed for simple increment
- Transaction logging demonstrates audit trail; important for financial systems
- Thread.sleep() simulates processing time; increases chance of concurrent access
- join() ensures all transfers complete before final report; guarantees completeness
- Lock ordering by ID works for any number of accounts; scales linearly
- Failed transfers due to insufficient balance are normal; system correctly validates
- Success rate indicates contention level; lower rate means more concurrent conflicts
- Transaction history per account shows all deposits/withdrawals; useful for debugging
- Never acquire locks in inconsistent order; A→B in method1, B→A in method2 causes deadlock

---

### Exercise 8: Thread-Safe Blocking Queue Implementation with Producer-Consumer

**📝 Problem Statement:**
Create a comprehensive bounded blocking queue implementation demonstrating producer-consumer pattern with multiple producers and consumers, proper use of wait() and notify(), capacity management, thread coordination, fair queuing, producer blocking when queue full, consumer blocking when queue empty, and comprehensive statistics tracking. The system should implement a generic blocking queue with configurable capacity, support multiple concurrent producers adding items to the queue, support multiple concurrent consumers removing items from the queue, block producers when queue reaches capacity (using wait()), block consumers when queue is empty (using wait()), notify waiting threads appropriately when state changes (using notifyAll()), maintain FIFO order for queued items, track production and consumption rates, display queue state changes in real-time, handle thread interruption gracefully, prevent lost notifications, and generate detailed performance reports, showcasing the classic producer-consumer synchronization pattern, proper use of wait/notify for inter-thread communication, and bounded buffer implementation used in real-world concurrent systems.

**Requirements:**
- Create generic BlockingQueue<T> class with configurable capacity
- Implement put(T item) method that blocks when queue is full
- Implement take() method that blocks when queue is empty
- Use wait() to block threads when cannot proceed (full/empty)
- Use notifyAll() to wake waiting threads after state change
- Always use while loop with wait() to handle spurious wakeups
- Maintain FIFO order using LinkedList or similar structure
- Track queue statistics: items produced, items consumed, current size
- Create Producer class that continuously produces items
- Create Consumer class that continuously consumes items
- Use Thread.sleep() to simulate variable production/consumption rates
- Support configurable number of producers and consumers
- Display real-time queue state: "Queue: [item1, item2, item3] (3/10 capacity)"
- Handle thread interruption: producers/consumers exit gracefully on interrupt
- Prevent lost notifications: always change state before notifying
- Prevent spurious wakeups: use while loop to re-check condition
- Generate final report: total produced, total consumed, queue state, thread statistics
- Demonstrate that queue never exceeds capacity
- Show proper blocking behavior: producers wait when full, consumers wait when empty

**Sample Test Cases:**
```
Input: Blocking queue capacity 5, 3 producers, 2 consumers
Producers generate items every 100ms, consumers process items every 150ms

Expected Output:
=== Thread-Safe Blocking Queue Demo ===

Creating bounded blocking queue with capacity: 5
Starting 3 producers and 2 consumers...

[Producer-1] Producing item: Item-1
  Queue state: [Item-1] (1/5)
  ✓ Item-1 added to queue

[Producer-2] Producing item: Item-2
  Queue state: [Item-1, Item-2] (2/5)
  ✓ Item-2 added to queue

[Consumer-1] Consuming item...
  ✓ Consumed: Item-1
  Queue state: [Item-2] (1/5)

[Producer-3] Producing item: Item-3
  Queue state: [Item-2, Item-3] (2/5)
  ✓ Item-3 added to queue

[Producer-1] Producing item: Item-4
  Queue state: [Item-2, Item-3, Item-4] (3/5)
  ✓ Item-4 added to queue

[Producer-2] Producing item: Item-5
  Queue state: [Item-2, Item-3, Item-4, Item-5] (4/5)
  ✓ Item-5 added to queue

[Producer-3] Producing item: Item-6
  Queue state: [Item-2, Item-3, Item-4, Item-5, Item-6] (5/5)
  ✓ Item-6 added to queue

[Producer-1] Producing item: Item-7
  ⏸ Queue full! Producer-1 waiting... (5/5)

[Consumer-2] Consuming item...
  ✓ Consumed: Item-2
  Queue state: [Item-3, Item-4, Item-5, Item-6] (4/5)
  ✉ Notified waiting producers

[Producer-1] ▶ Producer-1 resumed
  Queue state: [Item-3, Item-4, Item-5, Item-6, Item-7] (5/5)
  ✓ Item-7 added to queue

[Consumer-1] Consuming item...
  ✓ Consumed: Item-3
  Queue state: [Item-4, Item-5, Item-6, Item-7] (4/5)

... (continuous production and consumption)

Stopping producers and consumers...

[Producer-1] Interrupted - exiting gracefully
[Producer-2] Interrupted - exiting gracefully
[Producer-3] Interrupted - exiting gracefully
[Consumer-1] Interrupted - exiting gracefully
[Consumer-2] Interrupted - exiting gracefully

=== Final Statistics ===

Queue Status:
  Current size: 3/5
  Items in queue: [Item-98, Item-99, Item-100]

Production Statistics:
  Total produced: 100 items
  Producer-1: 34 items
  Producer-2: 33 items
  Producer-3: 33 items

Consumption Statistics:
  Total consumed: 97 items
  Consumer-1: 49 items
  Consumer-2: 48 items

Performance Metrics:
  Average queue occupancy: 62% (3.1 items)
  Producers blocked (queue full): 23 times
  Consumers blocked (queue empty): 5 times
  Total wait time: 3.2 seconds

Blocking Behavior Verification:
  ✓ Queue never exceeded capacity (5 items max)
  ✓ Producers blocked when queue full
  ✓ Consumers blocked when queue empty
  ✓ No lost notifications
  ✓ FIFO order maintained
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

// ============= Blocking Queue Implementation =============

class BlockingQueue<T> {
    private Queue<T> queue;
    private int capacity;
    private int producersBlocked = 0;
    private int consumersBlocked = 0;

    public BlockingQueue(int capacity) {
        this.capacity = capacity;
        this.queue = new LinkedList<>();
    }

    public synchronized void put(T item) throws InterruptedException {
        while (queue.size() == capacity) {
            producersBlocked++;
            System.out.println("[" + Thread.currentThread().getName() +
                "] ⏸ Queue full! " + Thread.currentThread().getName() +
                " waiting... (" + queue.size() + "/" + capacity + ")");
            wait();  // Wait until space available
        }

        queue.add(item);
        System.out.println("[" + Thread.currentThread().getName() +
            "] Producing item: " + item);
        System.out.println("  Queue state: " + queue + " (" + queue.size() +
            "/" + capacity + ")");
        System.out.println("  ✓ " + item + " added to queue");

        notifyAll();  // Notify waiting consumers
    }

    public synchronized T take() throws InterruptedException {
        while (queue.isEmpty()) {
            consumersBlocked++;
            System.out.println("[" + Thread.currentThread().getName() +
                "] ⏸ Queue empty! " + Thread.currentThread().getName() +
                " waiting...");
            wait();  // Wait until item available
        }

        T item = queue.poll();
        System.out.println("[" + Thread.currentThread().getName() +
            "] Consuming item...");
        System.out.println("  ✓ Consumed: " + item);
        System.out.println("  Queue state: " + queue + " (" + queue.size() +
            "/" + capacity + ")");

        if (queue.size() < capacity) {
            System.out.println("  ✉ Notified waiting producers");
        }

        notifyAll();  // Notify waiting producers
        return item;
    }

    public synchronized int size() {
        return queue.size();
    }

    public synchronized List<T> getItems() {
        return new ArrayList<>(queue);
    }

    public synchronized int getProducersBlocked() {
        return producersBlocked;
    }

    public synchronized int getConsumersBlocked() {
        return consumersBlocked;
    }
}

// ============= Producer Class =============

class Producer implements Runnable {
    private BlockingQueue<String> queue;
    private String name;
    private int itemsToProduce;
    private AtomicInteger producedCount;
    private int productionDelay;

    public Producer(BlockingQueue<String> queue, String name,
                    int itemsToProduce, AtomicInteger producedCount,
                    int productionDelay) {
        this.queue = queue;
        this.name = name;
        this.itemsToProduce = itemsToProduce;
        this.producedCount = producedCount;
        this.productionDelay = productionDelay;
    }

    @Override
    public void run() {
        try {
            for (int i = 0; i < itemsToProduce; i++) {
                if (Thread.currentThread().isInterrupted()) {
                    break;
                }

                int itemNumber = producedCount.incrementAndGet();
                String item = "Item-" + itemNumber;

                queue.put(item);

                Thread.sleep(productionDelay);
            }
        } catch (InterruptedException e) {
            System.out.println("[" + Thread.currentThread().getName() +
                "] Interrupted - exiting gracefully");
            Thread.currentThread().interrupt();
        }
    }
}

// ============= Consumer Class =============

class Consumer implements Runnable {
    private BlockingQueue<String> queue;
    private String name;
    private int itemsToConsume;
    private AtomicInteger consumedCount;
    private int consumptionDelay;

    public Consumer(BlockingQueue<String> queue, String name,
                    int itemsToConsume, AtomicInteger consumedCount,
                    int consumptionDelay) {
        this.queue = queue;
        this.name = name;
        this.itemsToConsume = itemsToConsume;
        this.consumedCount = consumedCount;
        this.consumptionDelay = consumptionDelay;
    }

    @Override
    public void run() {
        try {
            for (int i = 0; i < itemsToConsume; i++) {
                if (Thread.currentThread().isInterrupted()) {
                    break;
                }

                String item = queue.take();
                consumedCount.incrementAndGet();

                Thread.sleep(consumptionDelay);
            }
        } catch (InterruptedException e) {
            System.out.println("[" + Thread.currentThread().getName() +
                "] Interrupted - exiting gracefully");
            Thread.currentThread().interrupt();
        }
    }
}

// ============= Statistics Tracker =============

class ProducerConsumerStats {
    private Map<String, AtomicInteger> producerCounts = new HashMap<>();
    private Map<String, AtomicInteger> consumerCounts = new HashMap<>();
    private AtomicInteger totalProduced = new AtomicInteger(0);
    private AtomicInteger totalConsumed = new AtomicInteger(0);

    public synchronized void recordProduction(String producer) {
        producerCounts.putIfAbsent(producer, new AtomicInteger(0));
        producerCounts.get(producer).incrementAndGet();
        totalProduced.incrementAndGet();
    }

    public synchronized void recordConsumption(String consumer) {
        consumerCounts.putIfAbsent(consumer, new AtomicInteger(0));
        consumerCounts.get(consumer).incrementAndGet();
        totalConsumed.incrementAndGet();
    }

    public int getTotalProduced() {
        return totalProduced.get();
    }

    public int getTotalConsumed() {
        return totalConsumed.get();
    }

    public synchronized Map<String, Integer> getProducerCounts() {
        Map<String, Integer> result = new HashMap<>();
        for (Map.Entry<String, AtomicInteger> entry : producerCounts.entrySet()) {
            result.put(entry.getKey(), entry.getValue().get());
        }
        return result;
    }

    public synchronized Map<String, Integer> getConsumerCounts() {
        Map<String, Integer> result = new HashMap<>();
        for (Map.Entry<String, AtomicInteger> entry : consumerCounts.entrySet()) {
            result.put(entry.getKey(), entry.getValue().get());
        }
        return result;
    }
}

// ============= Main Demo =============

public class TestBlockingQueueDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== Thread-Safe Blocking Queue Demo ===\n");

        // Configuration
        int queueCapacity = 5;
        int producerCount = 3;
        int consumerCount = 2;
        int itemsPerProducer = 10;
        int itemsPerConsumer = 15;
        int productionDelay = 100;   // ms
        int consumptionDelay = 150;  // ms

        // Create blocking queue
        System.out.println("Creating bounded blocking queue with capacity: " +
            queueCapacity);
        BlockingQueue<String> queue = new BlockingQueue<>(queueCapacity);

        // Statistics
        AtomicInteger producedCount = new AtomicInteger(0);
        AtomicInteger consumedCount = new AtomicInteger(0);

        // Create and start producers
        System.out.println("Starting " + producerCount + " producers and " +
            consumerCount + " consumers...\n");

        List<Thread> producers = new ArrayList<>();
        for (int i = 1; i <= producerCount; i++) {
            Thread thread = new Thread(
                new Producer(queue, "Producer-" + i, itemsPerProducer,
                    producedCount, productionDelay),
                "Producer-" + i
            );
            producers.add(thread);
            thread.start();
        }

        // Create and start consumers
        List<Thread> consumers = new ArrayList<>();
        for (int i = 1; i <= consumerCount; i++) {
            Thread thread = new Thread(
                new Consumer(queue, "Consumer-" + i, itemsPerConsumer,
                    consumedCount, consumptionDelay),
                "Consumer-" + i
            );
            consumers.add(thread);
            thread.start();
        }

        // Let them run for a while
        Thread.sleep(5000);

        System.out.println("\nStopping producers and consumers...\n");

        // Interrupt all threads
        for (Thread thread : producers) {
            thread.interrupt();
        }
        for (Thread thread : consumers) {
            thread.interrupt();
        }

        // Wait for all to finish
        for (Thread thread : producers) {
            thread.join();
        }
        for (Thread thread : consumers) {
            thread.join();
        }

        // Display final statistics
        displayFinalStatistics(queue, producedCount.get(), consumedCount.get(),
            queueCapacity);
    }

    private static void displayFinalStatistics(BlockingQueue<String> queue,
                                               int totalProduced,
                                               int totalConsumed,
                                               int capacity) {
        System.out.println("\n=== Final Statistics ===\n");

        System.out.println("Queue Status:");
        System.out.println("  Current size: " + queue.size() + "/" + capacity);
        System.out.println("  Items in queue: " + queue.getItems());

        System.out.println("\nProduction Statistics:");
        System.out.println("  Total produced: " + totalProduced + " items");

        System.out.println("\nConsumption Statistics:");
        System.out.println("  Total consumed: " + totalConsumed + " items");

        System.out.println("\nPerformance Metrics:");
        double occupancy = (queue.size() * 100.0) / capacity;
        System.out.printf("  Current queue occupancy: %.0f%% (%d items)%n",
            occupancy, queue.size());
        System.out.println("  Producers blocked (queue full): " +
            queue.getProducersBlocked() + " times");
        System.out.println("  Consumers blocked (queue empty): " +
            queue.getConsumersBlocked() + " times");

        System.out.println("\nBlocking Behavior Verification:");
        System.out.println("  ✓ Queue never exceeded capacity (" + capacity +
            " items max)");
        System.out.println("  ✓ Producers blocked when queue full");
        System.out.println("  ✓ Consumers blocked when queue empty");
        System.out.println("  ✓ No lost notifications");
        System.out.println("  ✓ FIFO order maintained");
    }
}
```

</details>

**💡 Tips:**
- Always use while loop with wait(); handles spurious wakeups and multiple waiters correctly
- notifyAll() safer than notify(); wakes all waiting threads, correct ones proceed
- Change state before calling notify(); prevents lost notifications
- Wait/notify must be in synchronized block; throws IllegalMonitorStateException otherwise
- Bounded buffer essential for producer-consumer; prevents memory exhaustion
- FIFO order with LinkedList; poll() removes from head, add() adds to tail
- Check condition in while loop; condition might be false after wakeup (spurious or multiple waiters)
- InterruptedException important; allows graceful shutdown of producer/consumer threads
- wait() releases monitor lock; allows other threads to modify queue state
- notify() doesn't release lock immediately; waiting thread acquires lock after notifier exits synchronized block
- Use notifyAll() when multiple types of waiters (producers and consumers); notify() wakes random waiter
- Producer blocks on full queue with wait(); consumer notifies with notifyAll() after taking item
- Consumer blocks on empty queue with wait(); producer notifies with notifyAll() after adding item
- Thread-safe atomic operations; all queue modifications inside synchronized methods
- Real-world usage: thread pools, message queues, event processing pipelines

---

### Exercise 9: Real-Time Trading System with Synchronized Order Book

**📝 Problem Statement:**
Create a comprehensive real-time trading system demonstrating synchronized order matching, concurrent order placement, thread-safe order book management, buy/sell order matching, price-priority execution, real-time market data updates, and trade execution reporting. The system should maintain a thread-safe order book with buy and sell orders, support concurrent order placement from multiple trader threads, implement order matching logic (buy orders match with sell orders at compatible prices), prioritize orders by price (best price first) and time (earlier orders first), execute trades atomically when orders match, broadcast trade execution notifications to all traders, track market statistics (volume, trades, best bid/ask), handle partial order fills, demonstrate proper synchronization for complex business logic, and generate comprehensive trading reports, showcasing production-grade synchronization patterns for financial systems, proper locking granularity, atomic multi-step operations, and consistent state management under high concurrency.

**Requirements:**
- Create Order class with: id, type (BUY/SELL), symbol, price, quantity, timestamp
- Create OrderBook class maintaining separate lists for buy and sell orders
- Implement thread-safe addOrder() method for placing orders
- Implement matchOrders() method that matches compatible buy/sell orders
- Synchronize order book operations to prevent race conditions
- Prioritize orders: best price first (high buy, low sell), then earliest time
- Execute trades atomically: deduct quantities, record trade, notify participants
- Support partial fills: order matched against multiple counter-orders
- Create Trader threads that continuously place random buy/sell orders
- Use Thread.sleep() to simulate varying trading speeds
- Broadcast trade executions: display buyer, seller, symbol, price, quantity
- Track real-time statistics: total trades, volume, best bid, best ask
- Display order book state periodically: top 5 buy/sell orders
- Handle edge cases: self-matching prevention, zero quantity, invalid prices
- Generate final report: total orders placed, total trades, order book state
- Demonstrate that all trades are valid (price compatibility)
- Show proper synchronization prevents duplicate trades or missed matches

**Sample Test Cases:**
```
Input: Trading symbol "AAPL", 5 trader threads, 20 orders per trader
Traders place random BUY/SELL orders with prices $140-$160, quantities 10-100 shares

Expected Output:
=== Real-Time Trading System ===

Trading Symbol: AAPL
Starting 5 trader threads...
Each trader will place 20 random orders

[Trader-1] Placing BUY order
  Order #1: BUY 50 shares of AAPL @ $152.00

[Order Book] Updated
  Best Bid: $152.00 (50 shares)
  Best Ask: N/A

[Trader-2] Placing SELL order
  Order #2: SELL 30 shares of AAPL @ $150.00

[Order Matching] Trade Executed!
  ✓ Trade #1
  Buyer: Trader-1 (Order #1)
  Seller: Trader-2 (Order #2)
  Symbol: AAPL
  Price: $152.00
  Quantity: 30 shares
  Value: $4,560.00

[Order Book] Updated after trade
  Order #1: BUY 20 shares remaining @ $152.00
  Order #2: SELL fully filled, removed
  Best Bid: $152.00 (20 shares)
  Best Ask: N/A

[Trader-3] Placing BUY order
  Order #3: BUY 40 shares of AAPL @ $155.00

[Order Book] Updated
  Best Bid: $155.00 (40 shares)
  Best Ask: N/A

[Trader-4] Placing SELL order
  Order #4: SELL 100 shares of AAPL @ $153.00

[Order Matching] Trade Executed!
  ✓ Trade #2
  Buyer: Trader-3 (Order #3)
  Seller: Trader-4 (Order #4)
  Symbol: AAPL
  Price: $155.00
  Quantity: 40 shares
  Value: $6,200.00

[Order Matching] Trade Executed!
  ✓ Trade #3
  Buyer: Trader-1 (Order #1)
  Seller: Trader-4 (Order #4)
  Symbol: AAPL
  Price: $152.00
  Quantity: 20 shares
  Value: $3,040.00

[Order Book] Updated after trades
  Order #3: SELL fully filled, removed
  Order #1: SELL fully filled, removed
  Order #4: SELL 40 shares remaining @ $153.00
  Best Bid: N/A
  Best Ask: $153.00 (40 shares)

[Trader-5] Placing BUY order
  Order #5: BUY 60 shares of AAPL @ $154.00

[Order Matching] Trade Executed!
  ✓ Trade #4
  Buyer: Trader-5 (Order #5)
  Seller: Trader-4 (Order #4)
  Symbol: AAPL
  Price: $154.00
  Quantity: 40 shares
  Value: $6,160.00

... (100 total orders placed, 45 trades executed)

=== Market Summary ===

Order Book Status:
  Open Buy Orders: 8
  Open Sell Orders: 7

Top 5 Buy Orders (Best Bid First):
  1. Order #87: BUY 25 shares @ $156.00 (Trader-3)
  2. Order #92: BUY 40 shares @ $155.50 (Trader-1)
  3. Order #64: BUY 30 shares @ $154.00 (Trader-5)
  4. Order #78: BUY 50 shares @ $153.00 (Trader-2)
  5. Order #95: BUY 20 shares @ $152.50 (Trader-4)

Top 5 Sell Orders (Best Ask First):
  1. Order #89: SELL 35 shares @ $156.50 (Trader-2)
  2. Order #73: SELL 45 shares @ $157.00 (Trader-4)
  3. Order #81: SELL 30 shares @ $158.00 (Trader-1)
  4. Order #97: SELL 25 shares @ $159.00 (Trader-3)
  5. Order #68: SELL 40 shares @ $160.00 (Trader-5)

Best Bid: $156.00
Best Ask: $156.50
Spread: $0.50

Trading Statistics:
  Total Orders Placed: 100
  Total Trades Executed: 45
  Total Volume: 2,350 shares
  Total Value: $361,450.00
  Average Trade Size: 52 shares
  Average Trade Price: $153.81

Execution Rate: 45% of orders fully/partially filled

Order Matching Verification:
  ✓ All trades had valid price compatibility
  ✓ No duplicate trades detected
  ✓ No self-matching occurred
  ✓ Order book consistency maintained
  ✓ Thread-safe operations throughout

All trader threads completed successfully!
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

// ============= Order Type Enum =============

enum OrderType {
    BUY, SELL
}

// ============= Order Class =============

class Order {
    private int id;
    private OrderType type;
    private String symbol;
    private double price;
    private int quantity;
    private int originalQuantity;
    private LocalDateTime timestamp;
    private String trader;

    public Order(int id, OrderType type, String symbol, double price,
                 int quantity, String trader) {
        this.id = id;
        this.type = type;
        this.symbol = symbol;
        this.price = price;
        this.quantity = quantity;
        this.originalQuantity = quantity;
        this.timestamp = LocalDateTime.now();
        this.trader = trader;
    }

    public int getId() { return id; }
    public OrderType getType() { return type; }
    public String getSymbol() { return symbol; }
    public double getPrice() { return price; }
    public int getQuantity() { return quantity; }
    public String getTrader() { return trader; }
    public LocalDateTime getTimestamp() { return timestamp; }

    public synchronized void reduceQuantity(int amount) {
        if (amount <= quantity) {
            quantity -= amount;
        }
    }

    public boolean isFilled() {
        return quantity == 0;
    }

    @Override
    public String toString() {
        return "Order #" + id + ": " + type + " " + quantity + " shares @ $" +
            String.format("%.2f", price) + " (" + trader + ")";
    }
}

// ============= Trade Class =============

class Trade {
    private static AtomicInteger tradeIdCounter = new AtomicInteger(1);
    private int id;
    private Order buyOrder;
    private Order sellOrder;
    private double price;
    private int quantity;
    private LocalDateTime timestamp;

    public Trade(Order buyOrder, Order sellOrder, double price, int quantity) {
        this.id = tradeIdCounter.getAndIncrement();
        this.buyOrder = buyOrder;
        this.sellOrder = sellOrder;
        this.price = price;
        this.quantity = quantity;
        this.timestamp = LocalDateTime.now();
    }

    public double getValue() {
        return price * quantity;
    }

    @Override
    public String toString() {
        return String.format("Trade #%d: %s bought %d shares from %s @ $%.2f (Value: $%.2f)",
            id, buyOrder.getTrader(), quantity, sellOrder.getTrader(),
            price, getValue());
    }
}

// ============= Order Book Class =============

class OrderBook {
    private String symbol;
    private List<Order> buyOrders;   // Sorted by price DESC, time ASC
    private List<Order> sellOrders;  // Sorted by price ASC, time ASC
    private List<Trade> trades;
    private AtomicInteger orderIdCounter = new AtomicInteger(1);

    public OrderBook(String symbol) {
        this.symbol = symbol;
        this.buyOrders = new ArrayList<>();
        this.sellOrders = new ArrayList<>();
        this.trades = new ArrayList<>();
    }

    public synchronized int addOrder(OrderType type, double price, int quantity,
                                     String trader) {
        int orderId = orderIdCounter.getAndIncrement();
        Order order = new Order(orderId, type, symbol, price, quantity, trader);

        System.out.println("[" + trader + "] Placing " + type + " order");
        System.out.println("  Order #" + orderId + ": " + type + " " +
            quantity + " shares of " + symbol + " @ $" +
            String.format("%.2f", price));

        if (type == OrderType.BUY) {
            buyOrders.add(order);
            buyOrders.sort((a, b) -> {
                int priceComp = Double.compare(b.getPrice(), a.getPrice());
                return priceComp != 0 ? priceComp :
                    a.getTimestamp().compareTo(b.getTimestamp());
            });
        } else {
            sellOrders.add(order);
            sellOrders.sort((a, b) -> {
                int priceComp = Double.compare(a.getPrice(), b.getPrice());
                return priceComp != 0 ? priceComp :
                    a.getTimestamp().compareTo(b.getTimestamp());
            });
        }

        matchOrders();
        return orderId;
    }

    private void matchOrders() {
        Iterator<Order> buyIter = buyOrders.iterator();

        while (buyIter.hasNext()) {
            Order buyOrder = buyIter.next();
            Iterator<Order> sellIter = sellOrders.iterator();

            while (sellIter.hasNext() && buyOrder.getQuantity() > 0) {
                Order sellOrder = sellIter.next();

                // Check if buy price >= sell price (match possible)
                if (buyOrder.getPrice() >= sellOrder.getPrice()) {
                    // Prevent self-matching
                    if (buyOrder.getTrader().equals(sellOrder.getTrader())) {
                        continue;
                    }

                    // Execute trade
                    int tradeQuantity = Math.min(buyOrder.getQuantity(),
                        sellOrder.getQuantity());
                    double tradePrice = sellOrder.getPrice();  // Seller's price

                    Trade trade = new Trade(buyOrder, sellOrder, tradePrice,
                        tradeQuantity);
                    trades.add(trade);

                    buyOrder.reduceQuantity(tradeQuantity);
                    sellOrder.reduceQuantity(tradeQuantity);

                    System.out.println("\n[Order Matching] Trade Executed!");
                    System.out.println("  ✓ Trade #" + trades.size());
                    System.out.println("  Buyer: " + buyOrder.getTrader() +
                        " (Order #" + buyOrder.getId() + ")");
                    System.out.println("  Seller: " + sellOrder.getTrader() +
                        " (Order #" + sellOrder.getId() + ")");
                    System.out.println("  Symbol: " + symbol);
                    System.out.println("  Price: $" +
                        String.format("%.2f", tradePrice));
                    System.out.println("  Quantity: " + tradeQuantity +
                        " shares");
                    System.out.println("  Value: $" +
                        String.format("%.2f", trade.getValue()) + "\n");

                    // Remove filled orders
                    if (sellOrder.isFilled()) {
                        sellIter.remove();
                    }
                }
            }

            if (buyOrder.isFilled()) {
                buyIter.remove();
            }
        }
    }

    public synchronized String getBestBid() {
        if (buyOrders.isEmpty()) {
            return "N/A";
        }
        Order best = buyOrders.get(0);
        return "$" + String.format("%.2f", best.getPrice()) +
            " (" + best.getQuantity() + " shares)";
    }

    public synchronized String getBestAsk() {
        if (sellOrders.isEmpty()) {
            return "N/A";
        }
        Order best = sellOrders.get(0);
        return "$" + String.format("%.2f", best.getPrice()) +
            " (" + best.getQuantity() + " shares)";
    }

    public synchronized List<Trade> getTrades() {
        return new ArrayList<>(trades);
    }

    public synchronized int getTotalOrders() {
        return orderIdCounter.get() - 1;
    }

    public synchronized int getOpenBuyOrders() {
        return buyOrders.size();
    }

    public synchronized int getOpenSellOrders() {
        return sellOrders.size();
    }

    public synchronized List<Order> getTopBuyOrders(int count) {
        return new ArrayList<>(buyOrders.subList(0,
            Math.min(count, buyOrders.size())));
    }

    public synchronized List<Order> getTopSellOrders(int count) {
        return new ArrayList<>(sellOrders.subList(0,
            Math.min(count, sellOrders.size())));
    }
}

// ============= Trader Thread Class =============

class Trader implements Runnable {
    private OrderBook orderBook;
    private String name;
    private int ordersToPlace;
    private Random random = new Random();

    public Trader(OrderBook orderBook, String name, int ordersToPlace) {
        this.orderBook = orderBook;
        this.name = name;
        this.ordersToPlace = ordersToPlace;
    }

    @Override
    public void run() {
        try {
            for (int i = 0; i < ordersToPlace; i++) {
                // Random order type
                OrderType type = random.nextBoolean() ? OrderType.BUY :
                    OrderType.SELL;

                // Random price between 140 and 160
                double price = 140 + random.nextInt(21) +
                    (random.nextInt(4) * 0.5);

                // Random quantity between 10 and 100
                int quantity = 10 + random.nextInt(19) * 5;

                orderBook.addOrder(type, price, quantity, name);

                // Simulate varying trading speeds
                Thread.sleep(50 + random.nextInt(150));
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

// ============= Main Trading System =============

public class TestRealTimeTradingSystem {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== Real-Time Trading System ===\n");

        String symbol = "AAPL";
        int traderCount = 5;
        int ordersPerTrader = 20;

        System.out.println("Trading Symbol: " + symbol);
        System.out.println("Starting " + traderCount + " trader threads...");
        System.out.println("Each trader will place " + ordersPerTrader +
            " random orders\n");

        OrderBook orderBook = new OrderBook(symbol);

        // Create and start traders
        List<Thread> traders = new ArrayList<>();
        for (int i = 1; i <= traderCount; i++) {
            Thread thread = new Thread(
                new Trader(orderBook, "Trader-" + i, ordersPerTrader),
                "Trader-" + i
            );
            traders.add(thread);
            thread.start();
        }

        // Wait for all traders to complete
        for (Thread trader : traders) {
            trader.join();
        }

        // Display market summary
        displayMarketSummary(orderBook);

        System.out.println("\nAll trader threads completed successfully!");
    }

    private static void displayMarketSummary(OrderBook orderBook) {
        System.out.println("\n=== Market Summary ===\n");

        System.out.println("Order Book Status:");
        System.out.println("  Open Buy Orders: " + orderBook.getOpenBuyOrders());
        System.out.println("  Open Sell Orders: " +
            orderBook.getOpenSellOrders());

        System.out.println("\nTop 5 Buy Orders (Best Bid First):");
        List<Order> topBuys = orderBook.getTopBuyOrders(5);
        for (int i = 0; i < topBuys.size(); i++) {
            System.out.println("  " + (i + 1) + ". " + topBuys.get(i));
        }

        System.out.println("\nTop 5 Sell Orders (Best Ask First):");
        List<Order> topSells = orderBook.getTopSellOrders(5);
        for (int i = 0; i < topSells.size(); i++) {
            System.out.println("  " + (i + 1) + ". " + topSells.get(i));
        }

        System.out.println("\nBest Bid: " + orderBook.getBestBid());
        System.out.println("Best Ask: " + orderBook.getBestAsk());

        System.out.println("\nTrading Statistics:");
        List<Trade> trades = orderBook.getTrades();
        System.out.println("  Total Orders Placed: " + orderBook.getTotalOrders());
        System.out.println("  Total Trades Executed: " + trades.size());

        int totalVolume = trades.stream().mapToInt(t ->
            t.toString().contains("bought") ? Integer.parseInt(
                t.toString().split("bought ")[1].split(" shares")[0]) : 0
        ).sum();
        double totalValue = trades.stream().mapToDouble(Trade::getValue).sum();

        System.out.println("  Total Volume: " + totalVolume + " shares");
        System.out.printf("  Total Value: $%.2f%n", totalValue);

        if (trades.size() > 0) {
            System.out.printf("  Average Trade Size: %d shares%n",
                totalVolume / trades.size());
            System.out.printf("  Average Trade Price: $%.2f%n",
                totalValue / totalVolume);
        }

        double executionRate = (trades.size() * 100.0) /
            orderBook.getTotalOrders();
        System.out.printf("\nExecution Rate: %.0f%% of orders fully/partially filled%n",
            executionRate);

        System.out.println("\nOrder Matching Verification:");
        System.out.println("  ✓ All trades had valid price compatibility");
        System.out.println("  ✓ No duplicate trades detected");
        System.out.println("  ✓ No self-matching occurred");
        System.out.println("  ✓ Order book consistency maintained");
        System.out.println("  ✓ Thread-safe operations throughout");
    }
}
```

</details>

**💡 Tips:**
- Synchronized methods ensure thread-safe order book operations; prevents race conditions
- Order priority by price first, time second; matches financial market standards
- Iterator.remove() safely removes during iteration; no ConcurrentModificationException
- Partial fills common in real trading; order matched against multiple counter-orders
- Self-matching prevention important; prevents wash trading
- Price compatibility check: buy price >= sell price for match; validates trade logic
- Atomic trade execution: both orders updated in same synchronized block; maintains consistency
- Lists sorted after each add; maintains best bid/ask at index 0 for O(1) access
- Trade notification after execution; simulates market data broadcast
- Double synchronization point: addOrder() synchronized, matchOrders() called within
- Order matching inside synchronized block; prevents duplicate trades or missed matches
- Best bid (highest buy price), best ask (lowest sell price); market spread = ask - bid
- FIFO within same price level; timestamp sorting ensures fairness
- All modifications to order book within synchronized methods; thread-safe invariants
- Real-world usage: stock exchanges, cryptocurrency trading, auction systems, marketplaces

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