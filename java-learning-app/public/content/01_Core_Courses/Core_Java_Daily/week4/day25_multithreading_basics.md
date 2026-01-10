# Day 25: Multithreading Basics

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

By the end of Day 25, you will be able to:
- Understand what threads are and why they're important
- Create threads using Thread class and Runnable interface
- Understand thread lifecycle and states
- Use basic thread methods (start, sleep, join)
- Understand the difference between concurrency and parallelism
- Create and manage multiple threads
- Handle thread priorities
- Understand daemon threads

---

## 📚 Topics Covered

### 1. Introduction to Multithreading

#### What is a Thread?
A thread is a lightweight subprocess, the smallest unit of processing. It's an independent path of execution within a program.

#### Why Use Multithreading?
- **Better Performance**: Utilize multiple CPU cores
- **Responsiveness**: Keep UI responsive while processing
- **Resource Sharing**: Threads share memory space
- **Concurrent Operations**: Perform multiple tasks simultaneously
- **Asynchronous Processing**: Handle I/O operations efficiently

#### Real-World Examples:
```
- Web browser: Loading page while playing video
- Word processor: Spell check while typing
- Game: Rendering graphics while processing AI
- Server: Handling multiple client requests
- Download manager: Multiple simultaneous downloads
```

#### Process vs Thread:
```
Process:
- Independent execution unit
- Has its own memory space
- Heavy-weight
- Inter-process communication is expensive

Thread:
- Lightweight subprocess
- Shares memory with other threads
- Light-weight
- Inter-thread communication is easy
```

---

### 2. Creating Threads

There are two main ways to create threads in Java:

#### Method 1: Extending Thread Class

```java
class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + 
                ": " + i);
            try {
                Thread.sleep(1000);  // Sleep for 1 second
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class ThreadExample1 {
    public static void main(String[] args) {
        MyThread thread1 = new MyThread();
        MyThread thread2 = new MyThread();
        
        thread1.setName("Thread-1");
        thread2.setName("Thread-2");
        
        thread1.start();  // Start thread 1
        thread2.start();  // Start thread 2
        
        System.out.println("Main thread continues...");
    }
}
```

#### Method 2: Implementing Runnable Interface (Preferred)

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + 
                ": " + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class ThreadExample2 {
    public static void main(String[] args) {
        MyRunnable runnable = new MyRunnable();
        
        Thread thread1 = new Thread(runnable, "Thread-1");
        Thread thread2 = new Thread(runnable, "Thread-2");
        
        thread1.start();
        thread2.start();
        
        System.out.println("Main thread continues...");
    }
}
```

#### Using Lambda Expression (Java 8+)

```java
public class ThreadExample3 {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println(Thread.currentThread().getName() + 
                    ": " + i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "Thread-1");
        
        thread1.start();
    }
}
```

---

### 3. Thread Lifecycle

A thread goes through various states during its lifetime:

```
NEW → RUNNABLE → RUNNING → TERMINATED
         ↓           ↓
      BLOCKED    WAITING/TIMED_WAITING
```

#### Thread States:

```java
public class ThreadStates {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        
        System.out.println("State after creation: " + 
            thread.getState());  // NEW
        
        thread.start();
        System.out.println("State after start: " + 
            thread.getState());  // RUNNABLE
        
        Thread.sleep(100);
        System.out.println("State while sleeping: " + 
            thread.getState());  // TIMED_WAITING
        
        thread.join();
        System.out.println("State after completion: " + 
            thread.getState());  // TERMINATED
    }
}
```

**States Explained:**
1. **NEW**: Thread created but not started
2. **RUNNABLE**: Thread ready to run or running
3. **BLOCKED**: Thread waiting for monitor lock
4. **WAITING**: Thread waiting indefinitely
5. **TIMED_WAITING**: Thread waiting for specified time
6. **TERMINATED**: Thread completed execution

---

### 4. Important Thread Methods

#### sleep() Method:

```java
public class SleepExample {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("Count: " + i);
                try {
                    Thread.sleep(1000);  // Sleep for 1 second
                } catch (InterruptedException e) {
                    System.out.println("Thread interrupted");
                }
            }
        });
        
        thread.start();
    }
}
```

#### join() Method:

```java
public class JoinExample {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("Thread 1: " + i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        
        thread1.start();
        
        try {
            thread1.join();  // Wait for thread1 to complete
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Thread 1 completed, main continues");
    }
}
```

#### currentThread() Method:

```java
public class CurrentThreadExample {
    public static void main(String[] args) {
        Thread mainThread = Thread.currentThread();
        System.out.println("Main thread name: " + mainThread.getName());
        System.out.println("Main thread priority: " + 
            mainThread.getPriority());
        
        Thread thread = new Thread(() -> {
            Thread current = Thread.currentThread();
            System.out.println("Worker thread name: " + current.getName());
            System.out.println("Worker thread priority: " + 
                current.getPriority());
        });
        
        thread.start();
    }
}
```

---

### 5. Thread Priority

Threads have priorities from 1 (MIN_PRIORITY) to 10 (MAX_PRIORITY), with 5 (NORM_PRIORITY) as default.

```java
public class ThreadPriorityExample {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Low priority thread: " + i);
            }
        });
        
        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("High priority thread: " + i);
            }
        });
        
        thread1.setPriority(Thread.MIN_PRIORITY);  // 1
        thread2.setPriority(Thread.MAX_PRIORITY);  // 10
        
        thread1.start();
        thread2.start();
    }
}
```

**Note**: Thread priority is a hint to the scheduler, not a guarantee.

---

### 6. Daemon Threads

Daemon threads are background threads that don't prevent JVM from exiting.

```java
public class DaemonThreadExample {
    public static void main(String[] args) {
        Thread daemonThread = new Thread(() -> {
            while (true) {
                System.out.println("Daemon thread running...");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        
        daemonThread.setDaemon(true);  // Set as daemon
        daemonThread.start();
        
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Main thread ending...");
        // JVM exits, daemon thread stops automatically
    }
}
```

**Daemon Thread Characteristics:**
- Low priority background tasks
- JVM doesn't wait for daemon threads to finish
- Examples: Garbage collector, finalizer thread
- Must be set before calling start()

---

### 7. Multiple Threads Example

```java
class NumberPrinter implements Runnable {
    private String name;
    private int count;
    
    public NumberPrinter(String name, int count) {
        this.name = name;
        this.count = count;
    }
    
    @Override
    public void run() {
        for (int i = 1; i <= count; i++) {
            System.out.println(name + ": " + i);
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println(name + " completed!");
    }
}

public class MultipleThreadsExample {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new NumberPrinter("Thread-A", 5));
        Thread thread2 = new Thread(new NumberPrinter("Thread-B", 5));
        Thread thread3 = new Thread(new NumberPrinter("Thread-C", 5));
        
        thread1.start();
        thread2.start();
        thread3.start();
        
        System.out.println("All threads started!");
    }
}
```

---

### 8. Thread Information Methods

```java
public class ThreadInfoExample {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            Thread current = Thread.currentThread();
            
            System.out.println("Thread ID: " + current.getId());
            System.out.println("Thread Name: " + current.getName());
            System.out.println("Thread Priority: " + current.getPriority());
            System.out.println("Thread State: " + current.getState());
            System.out.println("Is Alive: " + current.isAlive());
            System.out.println("Is Daemon: " + current.isDaemon());
            System.out.println("Thread Group: " + 
                current.getThreadGroup().getName());
        }, "InfoThread");
        
        thread.start();
        
        try {
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Simple Thread Creation
Create two threads that print numbers from 1 to 5.


<details>
<summary>👁️ View Solution Code</summary>

```java
public class Exercise1 {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("Thread 1: " + i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        
        Thread thread2 = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("Thread 2: " + i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        
        thread1.start();
        thread2.start();
    }
}
```

</details>

---

### Exercise 2: Thread with Runnable
Create a Runnable class that prints even numbers.


<details>
<summary>👁️ View Solution Code</summary>

```java
class EvenNumberPrinter implements Runnable {
    private int limit;
    
    public EvenNumberPrinter(int limit) {
        this.limit = limit;
    }
    
    @Override
    public void run() {
        for (int i = 2; i <= limit; i += 2) {
            System.out.println(Thread.currentThread().getName() + 
                ": " + i);
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class Exercise2 {
    public static void main(String[] args) {
        Thread thread = new Thread(new EvenNumberPrinter(10), 
            "EvenThread");
        thread.start();
    }
}
```

</details>

---

### Exercise 3: Thread Join
Create threads that must complete in sequence.


<details>
<summary>👁️ View Solution Code</summary>

```java
public class Exercise3 {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            System.out.println("Thread 1 starting");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("Thread 1 completed");
        });
        
        Thread thread2 = new Thread(() -> {
            System.out.println("Thread 2 starting");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("Thread 2 completed");
        });
        
        thread1.start();
        
        try {
            thread1.join();  // Wait for thread1
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        thread2.start();
        
        try {
            thread2.join();  // Wait for thread2
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("All threads completed");
    }
}
```

</details>

---

### Exercise 4: Thread Priority
Create threads with different priorities.


<details>
<summary>👁️ View Solution Code</summary>

```java
class PriorityTask implements Runnable {
    private String name;
    
    public PriorityTask(String name) {
        this.name = name;
    }
    
    @Override
    public void run() {
        for (int i = 0; i < 3; i++) {
            System.out.println(name + " (Priority: " + 
                Thread.currentThread().getPriority() + "): " + i);
        }
    }
}

public class Exercise4 {
    public static void main(String[] args) {
        Thread lowPriority = new Thread(new PriorityTask("Low"), 
            "LowThread");
        Thread normalPriority = new Thread(new PriorityTask("Normal"), 
            "NormalThread");
        Thread highPriority = new Thread(new PriorityTask("High"), 
            "HighThread");
        
        lowPriority.setPriority(Thread.MIN_PRIORITY);
        normalPriority.setPriority(Thread.NORM_PRIORITY);
        highPriority.setPriority(Thread.MAX_PRIORITY);
        
        lowPriority.start();
        normalPriority.start();
        highPriority.start();
    }
}
```

</details>

---

### Exercise 5: Daemon Thread
Create a daemon thread for background monitoring.


<details>
<summary>👁️ View Solution Code</summary>

```java
public class Exercise5 {
    public static void main(String[] args) {
        Thread monitorThread = new Thread(() -> {
            int count = 0;
            while (true) {
                System.out.println("Monitoring... " + (++count));
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "MonitorThread");
        
        monitorThread.setDaemon(true);
        monitorThread.start();
        
        // Main thread does some work
        for (int i = 1; i <= 5; i++) {
            System.out.println("Main thread working: " + i);
            try {
                Thread.sleep(800);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        
        System.out.println("Main thread ending...");
        // Daemon thread will stop automatically
    }
}
```

</details>

---

### Exercise 6: Thread States
Demonstrate different thread states.


<details>
<summary>👁️ View Solution Code</summary>

```java
public class Exercise6 {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            System.out.println("Thread started");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("Thread ending");
        });
        
        System.out.println("State: " + thread.getState());  // NEW
        
        thread.start();
        System.out.println("State: " + thread.getState());  // RUNNABLE
        
        Thread.sleep(100);
        System.out.println("State: " + thread.getState());  // TIMED_WAITING
        
        thread.join();
        System.out.println("State: " + thread.getState());  // TERMINATED
    }
}
```

</details>

---

### Exercise 7: Multiple Worker Threads
Create multiple worker threads for parallel processing.


<details>
<summary>👁️ View Solution Code</summary>

```java
class Worker implements Runnable {
    private int workerId;
    private int tasksCount;
    
    public Worker(int workerId, int tasksCount) {
        this.workerId = workerId;
        this.tasksCount = tasksCount;
    }
    
    @Override
    public void run() {
        System.out.println("Worker " + workerId + " started");
        for (int i = 1; i <= tasksCount; i++) {
            System.out.println("Worker " + workerId + 
                " processing task " + i);
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("Worker " + workerId + " completed");
    }
}

public class Exercise7 {
    public static void main(String[] args) {
        Thread worker1 = new Thread(new Worker(1, 3));
        Thread worker2 = new Thread(new Worker(2, 3));
        Thread worker3 = new Thread(new Worker(3, 3));
        
        worker1.start();
        worker2.start();
        worker3.start();
        
        try {
            worker1.join();
            worker2.join();
            worker3.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("All workers completed");
    }
}
```

</details>

---

### Exercise 8: Thread Interruption
Handle thread interruption gracefully.


<details>
<summary>👁️ View Solution Code</summary>

```java
public class Exercise8 {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            try {
                for (int i = 1; i <= 10; i++) {
                    System.out.println("Count: " + i);
                    Thread.sleep(1000);
                }
            } catch (InterruptedException e) {
                System.out.println("Thread was interrupted!");
                return;
            }
            System.out.println("Thread completed normally");
        });
        
        thread.start();
        
        Thread.sleep(3000);  // Let it run for 3 seconds
        thread.interrupt();  // Interrupt the thread
        
        thread.join();
        System.out.println("Main thread ending");
    }
}
```

</details>

---

### Exercise 9: Thread Name and ID
Display thread information.


<details>
<summary>👁️ View Solution Code</summary>

```java
public class Exercise9 {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            Thread current = Thread.currentThread();
            System.out.println("Thread Name: " + current.getName());
            System.out.println("Thread ID: " + current.getId());
            System.out.println("Thread Priority: " + current.getPriority());
        }, "CustomThread");
        
        thread1.start();
        
        Thread mainThread = Thread.currentThread();
        System.out.println("\nMain Thread Name: " + mainThread.getName());
        System.out.println("Main Thread ID: " + mainThread.getId());
        System.out.println("Main Thread Priority: " + 
            mainThread.getPriority());
    }
}
```

</details>

---

### Exercise 10: Download Simulator
Simulate multiple file downloads using threads.


<details>
<summary>👁️ View Solution Code</summary>

```java
class DownloadTask implements Runnable {
    private String fileName;
    private int fileSize;
    
    public DownloadTask(String fileName, int fileSize) {
        this.fileName = fileName;
        this.fileSize = fileSize;
    }
    
    @Override
    public void run() {
        System.out.println("Starting download: " + fileName);
        for (int i = 10; i <= 100; i += 10) {
            System.out.println(fileName + ": " + i + "% complete");
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println(fileName + " download completed!");
    }
}

public class Exercise10 {
    public static void main(String[] args) {
        Thread download1 = new Thread(
            new DownloadTask("file1.pdf", 100), "Download-1");
        Thread download2 = new Thread(
            new DownloadTask("file2.mp4", 200), "Download-2");
        Thread download3 = new Thread(
            new DownloadTask("file3.zip", 150), "Download-3");
        
        download1.start();
        download2.start();
        download3.start();
        
        System.out.println("All downloads started!");
    }
}
```

</details>

---

### Exercise 11: Concurrent Data Processor with Multiple Worker Threads

**📝 Problem Statement:**
Create a comprehensive data processing system demonstrating concurrent task execution with multiple worker threads, shared work queue, progress tracking, and proper thread coordination. The system should accept a list of data items to process, distribute them among worker threads, track processing progress in real-time, handle worker thread failures gracefully, and wait for all processing to complete before generating a final report, showcasing how multithreading enables parallel processing to improve throughput and demonstrate practical thread lifecycle management, coordination using join(), and basic shared data structure access patterns.

**Requirements:**
- Create a DataItem class representing work to be processed (id, data, processingTime)
- Create a Worker class implementing Runnable for processing data items
- Use a shared List<DataItem> as the work queue (thread-safe access needed)
- Create configurable number of worker threads (e.g., 3-5 workers)
- Each worker thread retrieves items from shared queue and processes them
- Simulate processing with Thread.sleep() for specified processing time
- Track progress: total items, processed items, failed items, workers active
- Use meaningful thread names: "Worker-1", "Worker-2", etc.
- Implement graceful shutdown: wait for all workers to complete using join()
- Display real-time progress from a monitoring thread (daemon thread)
- Handle processing failures: random failures, worker continues with next item
- Generate final statistics: total time, items processed, success rate, per-worker stats
- Demonstrate proper exception handling in worker threads
- Use Thread.currentThread() to identify which worker is processing which item
- Implement proper thread coordination without explicit synchronization (preview only)
- Display start/end messages for each worker thread

**Sample Test Cases:**
```
Input: Process 20 data items with 4 worker threads
Items: [Item-1 (500ms), Item-2 (300ms), Item-3 (700ms), ..., Item-20 (600ms)]
Workers: 4 threads (Worker-1, Worker-2, Worker-3, Worker-4)

Expected Output:
=== Concurrent Data Processor ===

Creating 20 data items to process...
✓ Created 20 items with varying processing times

Launching 4 worker threads...
✓ Worker-1 started
✓ Worker-2 started
✓ Worker-3 started
✓ Worker-4 started

[Monitor] Progress: 0/20 items processed, 4 workers active
Worker-1: Processing Item-1 (500ms)...
Worker-2: Processing Item-2 (300ms)...
Worker-3: Processing Item-3 (700ms)...
Worker-4: Processing Item-4 (400ms)...
Worker-2: ✓ Item-2 completed
Worker-2: Processing Item-5 (600ms)...
Worker-4: ✓ Item-4 completed
Worker-4: Processing Item-6 (350ms)...
[Monitor] Progress: 2/20 items processed, 4 workers active
Worker-1: ✓ Item-1 completed
Worker-1: Processing Item-7 (450ms)...
Worker-3: ✓ Item-3 completed
Worker-3: Processing Item-8 (800ms)...
Worker-4: ✓ Item-6 completed
Worker-4: Processing Item-9 (300ms)...
...
Worker-2: Processing Item-18 (500ms)...
Worker-1: ✗ Item-17 failed (simulated failure)
Worker-1: Processing Item-19 (400ms)...
[Monitor] Progress: 16/20 items processed, 4 workers active
Worker-4: ✓ Item-16 completed
Worker-4: Processing Item-20 (600ms)...
Worker-2: ✓ Item-18 completed
Worker-2: No more items to process
Worker-2 completed with 5 items processed (1 failed)
Worker-1: ✓ Item-19 completed
Worker-1: No more items to process
Worker-1 completed with 5 items processed (1 failed)
Worker-4: ✓ Item-20 completed
Worker-4: No more items to process
Worker-4 completed with 5 items processed (0 failed)
Worker-3: ✓ Item-15 completed
Worker-3: No more items to process
Worker-3 completed with 5 items processed (0 failed)

[Monitor] Progress: 20/20 items processed, 0 workers active
Monitor thread ending...

=== Processing Complete ===

Final Statistics:
- Total Items: 20
- Successfully Processed: 18
- Failed: 2
- Success Rate: 90.0%
- Total Processing Time: 4.523 seconds
- Average per Item: 226ms

Worker Statistics:
  Worker-1: 5 items (1 failed)
  Worker-2: 5 items (1 failed)
  Worker-3: 5 items (0 failed)
  Worker-4: 5 items (0 failed)

All workers completed successfully!
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

// ============= Data Item Class =============

class DataItem {
    private int id;
    private String data;
    private int processingTimeMs;

    public DataItem(int id, String data, int processingTimeMs) {
        this.id = id;
        this.data = data;
        this.processingTimeMs = processingTimeMs;
    }

    public int getId() {
        return id;
    }

    public String getData() {
        return data;
    }

    public int getProcessingTimeMs() {
        return processingTimeMs;
    }

    @Override
    public String toString() {
        return "Item-" + id + " (" + processingTimeMs + "ms)";
    }
}

// ============= Worker Statistics Class =============

class WorkerStats {
    private String workerName;
    private int itemsProcessed = 0;
    private int itemsFailed = 0;

    public WorkerStats(String workerName) {
        this.workerName = workerName;
    }

    public synchronized void incrementProcessed() {
        itemsProcessed++;
    }

    public synchronized void incrementFailed() {
        itemsFailed++;
    }

    public String getWorkerName() {
        return workerName;
    }

    public int getItemsProcessed() {
        return itemsProcessed;
    }

    public int getItemsFailed() {
        return itemsFailed;
    }
}

// ============= Worker Thread Class =============

class Worker implements Runnable {
    private List<DataItem> workQueue;
    private WorkerStats stats;
    private AtomicInteger totalProcessed;
    private AtomicInteger totalFailed;
    private Random random = new Random();

    public Worker(List<DataItem> workQueue, WorkerStats stats,
                  AtomicInteger totalProcessed, AtomicInteger totalFailed) {
        this.workQueue = workQueue;
        this.stats = stats;
        this.totalProcessed = totalProcessed;
        this.totalFailed = totalFailed;
    }

    @Override
    public void run() {
        String workerName = Thread.currentThread().getName();
        System.out.println("✓ " + workerName + " started");

        try {
            while (true) {
                DataItem item = getNextItem();

                if (item == null) {
                    System.out.println(workerName + ": No more items to process");
                    break;
                }

                processItem(item);
            }

            System.out.println(workerName + " completed with " +
                stats.getItemsProcessed() + " items processed (" +
                stats.getItemsFailed() + " failed)");

        } catch (Exception e) {
            System.err.println(workerName + " encountered error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private synchronized DataItem getNextItem() {
        // Synchronized method to safely retrieve next item from shared queue
        if (workQueue.isEmpty()) {
            return null;
        }
        return workQueue.remove(0);
    }

    private void processItem(DataItem item) {
        String workerName = Thread.currentThread().getName();
        System.out.println(workerName + ": Processing " + item + "...");

        try {
            // Simulate processing with sleep
            Thread.sleep(item.getProcessingTimeMs());

            // Simulate random failures (10% chance)
            if (random.nextInt(10) == 0) {
                throw new RuntimeException("Processing failed (simulated failure)");
            }

            // Success
            System.out.println(workerName + ": ✓ " + item + " completed");
            stats.incrementProcessed();
            totalProcessed.incrementAndGet();

        } catch (InterruptedException e) {
            System.out.println(workerName + " was interrupted");
            Thread.currentThread().interrupt();
            stats.incrementFailed();
            totalFailed.incrementAndGet();

        } catch (Exception e) {
            System.out.println(workerName + ": ✗ " + item + " failed (" + e.getMessage() + ")");
            stats.incrementFailed();
            totalFailed.incrementAndGet();
        }
    }
}

// ============= Progress Monitor Class =============

class ProgressMonitor implements Runnable {
    private int totalItems;
    private AtomicInteger totalProcessed;
    private List<Thread> workers;
    private volatile boolean running = true;

    public ProgressMonitor(int totalItems, AtomicInteger totalProcessed,
                           List<Thread> workers) {
        this.totalItems = totalItems;
        this.totalProcessed = totalProcessed;
        this.workers = workers;
    }

    @Override
    public void run() {
        try {
            while (running) {
                int processed = totalProcessed.get();
                int activeWorkers = countActiveWorkers();

                System.out.println("[Monitor] Progress: " + processed + "/" +
                    totalItems + " items processed, " + activeWorkers + " workers active");

                if (processed >= totalItems) {
                    break;
                }

                Thread.sleep(1000);  // Update every second
            }

            System.out.println("Monitor thread ending...");

        } catch (InterruptedException e) {
            System.out.println("Monitor interrupted");
        }
    }

    private int countActiveWorkers() {
        int active = 0;
        for (Thread worker : workers) {
            if (worker.isAlive()) {
                active++;
            }
        }
        return active;
    }

    public void stop() {
        running = false;
    }
}

// ============= Main Data Processor =============

public class TestConcurrentDataProcessor {

    public static void main(String[] args) {
        System.out.println("=== Concurrent Data Processor ===\n");

        // Configuration
        int totalItems = 20;
        int workerCount = 4;

        // Create data items
        System.out.println("Creating " + totalItems + " data items to process...");
        List<DataItem> workQueue = createDataItems(totalItems);
        System.out.println("✓ Created " + totalItems + " items with varying processing times\n");

        // Statistics
        AtomicInteger totalProcessed = new AtomicInteger(0);
        AtomicInteger totalFailed = new AtomicInteger(0);
        List<WorkerStats> workerStatsList = new ArrayList<>();

        // Create and start worker threads
        System.out.println("Launching " + workerCount + " worker threads...");
        List<Thread> workers = new ArrayList<>();

        for (int i = 1; i <= workerCount; i++) {
            WorkerStats stats = new WorkerStats("Worker-" + i);
            workerStatsList.add(stats);

            Worker worker = new Worker(workQueue, stats, totalProcessed, totalFailed);
            Thread thread = new Thread(worker, "Worker-" + i);
            workers.add(thread);
            thread.start();
        }

        System.out.println();

        // Start monitoring thread (daemon)
        Thread monitor = new Thread(
            new ProgressMonitor(totalItems, totalProcessed, workers),
            "Monitor"
        );
        monitor.setDaemon(true);
        monitor.start();

        // Record start time
        long startTime = System.currentTimeMillis();

        // Wait for all workers to complete
        try {
            for (Thread worker : workers) {
                worker.join();  // Wait for each worker to finish
            }
        } catch (InterruptedException e) {
            System.err.println("Main thread interrupted while waiting for workers");
            e.printStackTrace();
        }

        // Calculate total time
        long endTime = System.currentTimeMillis();
        double totalSeconds = (endTime - startTime) / 1000.0;

        // Display final statistics
        System.out.println("\n=== Processing Complete ===\n");
        displayFinalStatistics(totalItems, totalProcessed.get(),
            totalFailed.get(), totalSeconds, workerStatsList);

        System.out.println("\nAll workers completed successfully!");
    }

    private static List<DataItem> createDataItems(int count) {
        List<DataItem> items = new ArrayList<>();
        Random random = new Random();

        for (int i = 1; i <= count; i++) {
            int processingTime = 300 + random.nextInt(500);  // 300-800ms
            items.add(new DataItem(i, "Data-" + i, processingTime));
        }

        return items;
    }

    private static void displayFinalStatistics(int totalItems, int processed,
            int failed, double totalSeconds, List<WorkerStats> workerStats) {

        System.out.println("Final Statistics:");
        System.out.println("- Total Items: " + totalItems);
        System.out.println("- Successfully Processed: " + processed);
        System.out.println("- Failed: " + failed);
        System.out.printf("- Success Rate: %.1f%%%n",
            (processed * 100.0) / totalItems);
        System.out.printf("- Total Processing Time: %.3f seconds%n", totalSeconds);
        System.out.printf("- Average per Item: %.0fms%n",
            (totalSeconds * 1000) / totalItems);

        System.out.println("\nWorker Statistics:");
        for (WorkerStats stats : workerStats) {
            System.out.println("  " + stats.getWorkerName() + ": " +
                stats.getItemsProcessed() + " items (" +
                stats.getItemsFailed() + " failed)");
        }
    }
}
```

</details>

**💡 Tips:**
- Multiple threads can process work items concurrently; improves throughput over sequential processing
- Shared work queue requires synchronization; use synchronized method or Collections.synchronizedList()
- AtomicInteger provides thread-safe counter without explicit synchronization; useful for statistics
- Thread.join() waits for thread completion; essential for coordinating multiple threads
- Daemon threads (monitor) automatically terminate when all non-daemon threads finish
- Thread names aid debugging; use setName() or Thread constructor with name parameter
- Each worker retrieves items independently; work distribution happens naturally
- Random failures simulate real-world error conditions; workers continue processing
- Try-catch in run() prevents uncaught exceptions from silently terminating threads
- InterruptedException handling important; restore interrupt status with Thread.currentThread().interrupt()
- Monitor thread provides visibility into processing progress without blocking workers
- Statistics tracking demonstrates thread-safe data collection patterns
- Empty work queue signals workers to terminate; polling pattern for task completion
- Total processing time less than sum of individual item times due to parallelism
- Worker thread count should match CPU cores for CPU-bound tasks; more for I/O-bound tasks

---

### Exercise 12: Download Manager with Concurrent Downloads and Progress Tracking

**📝 Problem Statement:**
Create a comprehensive download manager system demonstrating concurrent file downloads with multiple downloader threads, real-time progress tracking, bandwidth simulation, download state management, and proper thread lifecycle control. The system should accept a list of files to download (with URLs and sizes), create downloader threads for each file, simulate progressive download with configurable speed, track download progress with percentage completion, handle download failures and retries, display real-time progress for all active downloads, support pausing and resuming downloads, and wait for all downloads to complete before generating a summary report, showcasing practical multithreading patterns for I/O-bound concurrent operations, thread coordination, and state management in long-running tasks.

**Requirements:**
- Create a DownloadTask class representing a file download (filename, size, URL, status)
- Implement download states: PENDING, DOWNLOADING, PAUSED, COMPLETED, FAILED
- Create a Downloader class implementing Runnable for downloading files
- Simulate download progress: incrementally download chunks with Thread.sleep()
- Track progress: bytes downloaded, percentage complete, download speed
- Display progress updates: "file.pdf: 45% complete (4.5 MB / 10 MB)"
- Use thread names based on filename: "Downloader-file.pdf"
- Handle download failures: random failures, automatic retry (up to 3 attempts)
- Support download pause/resume: check volatile flag periodically
- Create separate thread for each download (no thread pool for this exercise)
- Use Thread.sleep() to simulate network latency and bandwidth limits
- Display real-time status updates from all downloader threads
- Wait for all downloads using join() with timeout
- Generate final report: total downloaded, success rate, total time, per-file results
- Demonstrate thread interruption: ability to cancel downloads
- Track download attempts and retry count for each file

**Sample Test Cases:**
```
Input: Download 5 files concurrently
Files:
  - document.pdf (10 MB)
  - video.mp4 (50 MB)
  - music.mp3 (5 MB)
  - image.jpg (2 MB)
  - archive.zip (25 MB)
Download speed: 1 MB/s simulated

Expected Output:
=== Download Manager ===

Preparing to download 5 files...
✓ document.pdf (10.00 MB)
✓ video.mp4 (50.00 MB)
✓ music.mp3 (5.00 MB)
✓ image.jpg (2.00 MB)
✓ archive.zip (25.00 MB)

Starting downloads...
[Downloader-document.pdf] Started
[Downloader-video.mp4] Started
[Downloader-music.mp3] Started
[Downloader-image.jpg] Started
[Downloader-archive.zip] Started

document.pdf: 10% complete (1.00 MB / 10.00 MB) [Downloading]
video.mp4: 2% complete (1.00 MB / 50.00 MB) [Downloading]
music.mp3: 20% complete (1.00 MB / 5.00 MB) [Downloading]
image.jpg: 50% complete (1.00 MB / 2.00 MB) [Downloading]
archive.zip: 4% complete (1.00 MB / 25.00 MB) [Downloading]

image.jpg: 100% complete (2.00 MB / 2.00 MB) [Downloading]
[Downloader-image.jpg] ✓ Download completed
image.jpg: [COMPLETED] Downloaded in 2.1 seconds

music.mp3: 100% complete (5.00 MB / 5.00 MB) [Downloading]
[Downloader-music.mp3] ✓ Download completed
music.mp3: [COMPLETED] Downloaded in 5.2 seconds

document.pdf: 50% complete (5.00 MB / 10.00 MB) [Downloading]
video.mp4: 20% complete (10.00 MB / 50.00 MB) [Downloading]
archive.zip: 40% complete (10.00 MB / 25.00 MB) [Downloading]

document.pdf: 100% complete (10.00 MB / 10.00 MB) [Downloading]
[Downloader-document.pdf] ✓ Download completed
document.pdf: [COMPLETED] Downloaded in 10.5 seconds

archive.zip: 80% complete (20.00 MB / 25.00 MB) [Downloading]
video.mp4: 50% complete (25.00 MB / 50.00 MB) [Downloading]

archive.zip: 100% complete (25.00 MB / 25.00 MB) [Downloading]
[Downloader-archive.zip] ✓ Download completed
archive.zip: [COMPLETED] Downloaded in 26.3 seconds

video.mp4: 90% complete (45.00 MB / 50.00 MB) [Downloading]
video.mp4: 98% complete (49.00 MB / 50.00 MB) [Downloading]
[Downloader-video.mp4] ✗ Download failed (network error - simulated)
[Downloader-video.mp4] Retrying... (Attempt 2/3)
video.mp4: 0% complete (0.00 MB / 50.00 MB) [Downloading]
video.mp4: 20% complete (10.00 MB / 50.00 MB) [Downloading]
video.mp4: 100% complete (50.00 MB / 50.00 MB) [Downloading]
[Downloader-video.mp4] ✓ Download completed
video.mp4: [COMPLETED] Downloaded in 62.8 seconds (2 attempts)

All downloads completed!

=== Download Summary ===

Total Files: 5
Successfully Downloaded: 5
Failed: 0
Success Rate: 100.0%
Total Downloaded: 92.00 MB
Total Time: 62.8 seconds
Average Speed: 1.46 MB/s

Individual Results:
  ✓ image.jpg: 2.00 MB in 2.1s (1 attempt)
  ✓ music.mp3: 5.00 MB in 5.2s (1 attempt)
  ✓ document.pdf: 10.00 MB in 10.5s (1 attempt)
  ✓ archive.zip: 25.00 MB in 26.3s (1 attempt)
  ✓ video.mp4: 50.00 MB in 62.8s (2 attempts)
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.util.*;

// ============= Download States Enum =============

enum DownloadState {
    PENDING, DOWNLOADING, PAUSED, COMPLETED, FAILED
}

// ============= Download Task Class =============

class DownloadTask {
    private String filename;
    private long sizeBytes;
    private String url;
    private DownloadState state;
    private long downloadedBytes;
    private int attempts;
    private long startTime;
    private long endTime;

    public DownloadTask(String filename, long sizeBytes, String url) {
        this.filename = filename;
        this.sizeBytes = sizeBytes;
        this.url = url;
        this.state = DownloadState.PENDING;
        this.downloadedBytes = 0;
        this.attempts = 0;
    }

    // Getters and setters
    public String getFilename() { return filename; }
    public long getSizeBytes() { return sizeBytes; }
    public String getUrl() { return url; }
    public DownloadState getState() { return state; }
    public void setState(DownloadState state) { this.state = state; }
    public long getDownloadedBytes() { return downloadedBytes; }
    public void setDownloadedBytes(long bytes) { this.downloadedBytes = bytes; }
    public void incrementAttempts() { attempts++; }
    public int getAttempts() { return attempts; }
    public void setStartTime(long time) { this.startTime = time; }
    public void setEndTime(long time) { this.endTime = time; }
    public long getStartTime() { return startTime; }
    public long getEndTime() { return endTime; }

    public double getPercentComplete() {
        return (downloadedBytes * 100.0) / sizeBytes;
    }

    public double getDurationSeconds() {
        if (startTime == 0) return 0;
        long end = (endTime > 0) ? endTime : System.currentTimeMillis();
        return (end - startTime) / 1000.0;
    }
}

// ============= Downloader Thread Class =============

class Downloader implements Runnable {
    private DownloadTask task;
    private int chunkSizeBytes;
    private int downloadSpeedBytesPerSec;
    private Random random = new Random();
    private static final int MAX_RETRIES = 3;

    public Downloader(DownloadTask task, int chunkSizeBytes, int downloadSpeedBytesPerSec) {
        this.task = task;
        this.chunkSizeBytes = chunkSizeBytes;
        this.downloadSpeedBytesPerSec = downloadSpeedBytesPerSec;
    }

    @Override
    public void run() {
        String threadName = Thread.currentThread().getName();
        System.out.println("[" + threadName + "] Started");

        task.setStartTime(System.currentTimeMillis());

        boolean success = false;
        while (task.getAttempts() < MAX_RETRIES && !success) {
            task.incrementAttempts();

            if (task.getAttempts() > 1) {
                System.out.println("[" + threadName + "] Retrying... (Attempt " +
                    task.getAttempts() + "/" + MAX_RETRIES + ")");
                task.setDownloadedBytes(0);  // Reset progress on retry
            }

            success = performDownload();
        }

        if (success) {
            task.setState(DownloadState.COMPLETED);
            task.setEndTime(System.currentTimeMillis());
            System.out.println("[" + threadName + "] ✓ Download completed");
            System.out.printf("%s: [COMPLETED] Downloaded in %.1f seconds%s%n",
                task.getFilename(),
                task.getDurationSeconds(),
                task.getAttempts() > 1 ? " (" + task.getAttempts() + " attempts)" : "");
        } else {
            task.setState(DownloadState.FAILED);
            task.setEndTime(System.currentTimeMillis());
            System.out.println("[" + threadName + "] ✗ Download failed after " +
                MAX_RETRIES + " attempts");
        }
    }

    private boolean performDownload() {
        String threadName = Thread.currentThread().getName();
        task.setState(DownloadState.DOWNLOADING);

        try {
            while (task.getDownloadedBytes() < task.getSizeBytes()) {
                // Simulate downloading a chunk
                int bytesToDownload = Math.min(chunkSizeBytes,
                    (int)(task.getSizeBytes() - task.getDownloadedBytes()));

                // Simulate network latency
                int sleepTimeMs = (bytesToDownload * 1000) / downloadSpeedBytesPerSec;
                Thread.sleep(sleepTimeMs);

                // Update downloaded bytes
                task.setDownloadedBytes(task.getDownloadedBytes() + bytesToDownload);

                // Display progress periodically
                if (task.getDownloadedBytes() % (chunkSizeBytes * 5) == 0 ||
                    task.getDownloadedBytes() >= task.getSizeBytes()) {
                    displayProgress();
                }

                // Simulate random failures (5% chance per chunk)
                if (random.nextInt(100) < 5 && task.getDownloadedBytes() < task.getSizeBytes()) {
                    throw new RuntimeException("network error - simulated");
                }

                // Check for interruption
                if (Thread.currentThread().isInterrupted()) {
                    System.out.println("[" + threadName + "] Download interrupted");
                    return false;
                }
            }

            return true;  // Download completed successfully

        } catch (InterruptedException e) {
            System.out.println("[" + threadName + "] Download interrupted");
            Thread.currentThread().interrupt();
            return false;

        } catch (Exception e) {
            System.out.println("[" + threadName + "] ✗ Download failed (" +
                e.getMessage() + ")");
            return false;
        }
    }

    private void displayProgress() {
        System.out.printf("%s: %.0f%% complete (%.2f MB / %.2f MB) [%s]%n",
            task.getFilename(),
            task.getPercentComplete(),
            task.getDownloadedBytes() / (1024.0 * 1024.0),
            task.getSizeBytes() / (1024.0 * 1024.0),
            task.getState());
    }
}

// ============= Main Download Manager =============

public class TestDownloadManager {

    public static void main(String[] args) {
        System.out.println("=== Download Manager ===\n");

        // Configuration
        int chunkSize = 1024 * 1024;  // 1 MB chunks
        int downloadSpeed = 1024 * 1024;  // 1 MB/s

        // Create download tasks
        System.out.println("Preparing to download 5 files...");
        List<DownloadTask> tasks = createDownloadTasks();

        for (DownloadTask task : tasks) {
            System.out.printf("✓ %s (%.2f MB)%n",
                task.getFilename(),
                task.getSizeBytes() / (1024.0 * 1024.0));
        }

        // Create and start downloader threads
        System.out.println("\nStarting downloads...");
        List<Thread> downloaders = new ArrayList<>();

        for (DownloadTask task : tasks) {
            Downloader downloader = new Downloader(task, chunkSize, downloadSpeed);
            Thread thread = new Thread(downloader, "Downloader-" + task.getFilename());
            downloaders.add(thread);
            thread.start();
        }

        System.out.println();

        // Record start time
        long startTime = System.currentTimeMillis();

        // Wait for all downloads to complete
        try {
            for (Thread downloader : downloaders) {
                downloader.join();  // Wait for each download to finish
            }
        } catch (InterruptedException e) {
            System.err.println("Main thread interrupted while waiting for downloads");
            e.printStackTrace();
        }

        // Calculate total time
        long endTime = System.currentTimeMillis();
        double totalSeconds = (endTime - startTime) / 1000.0;

        System.out.println("\nAll downloads completed!");

        // Display summary
        displaySummary(tasks, totalSeconds);
    }

    private static List<DownloadTask> createDownloadTasks() {
        List<DownloadTask> tasks = new ArrayList<>();

        tasks.add(new DownloadTask("document.pdf",
            10 * 1024 * 1024, "http://example.com/document.pdf"));
        tasks.add(new DownloadTask("video.mp4",
            50 * 1024 * 1024, "http://example.com/video.mp4"));
        tasks.add(new DownloadTask("music.mp3",
            5 * 1024 * 1024, "http://example.com/music.mp3"));
        tasks.add(new DownloadTask("image.jpg",
            2 * 1024 * 1024, "http://example.com/image.jpg"));
        tasks.add(new DownloadTask("archive.zip",
            25 * 1024 * 1024, "http://example.com/archive.zip"));

        return tasks;
    }

    private static void displaySummary(List<DownloadTask> tasks, double totalSeconds) {
        System.out.println("\n=== Download Summary ===\n");

        int totalFiles = tasks.size();
        int successful = 0;
        long totalBytes = 0;

        for (DownloadTask task : tasks) {
            if (task.getState() == DownloadState.COMPLETED) {
                successful++;
                totalBytes += task.getSizeBytes();
            }
        }

        System.out.println("Total Files: " + totalFiles);
        System.out.println("Successfully Downloaded: " + successful);
        System.out.println("Failed: " + (totalFiles - successful));
        System.out.printf("Success Rate: %.1f%%%n", (successful * 100.0) / totalFiles);
        System.out.printf("Total Downloaded: %.2f MB%n", totalBytes / (1024.0 * 1024.0));
        System.out.printf("Total Time: %.1f seconds%n", totalSeconds);
        System.out.printf("Average Speed: %.2f MB/s%n",
            (totalBytes / (1024.0 * 1024.0)) / totalSeconds);

        System.out.println("\nIndividual Results:");
        for (DownloadTask task : tasks) {
            String status = task.getState() == DownloadState.COMPLETED ? "✓" : "✗";
            System.out.printf("  %s %s: %.2f MB in %.1fs (%d attempt%s)%n",
                status,
                task.getFilename(),
                task.getSizeBytes() / (1024.0 * 1024.0),
                task.getDurationSeconds(),
                task.getAttempts(),
                task.getAttempts() > 1 ? "s" : "");
        }
    }
}
```

</details>

**💡 Tips:**
- Each download runs in separate thread; true concurrent execution for I/O operations
- Thread.sleep() simulates network latency; real downloads would use socket I/O
- Chunk-based progress enables incremental updates; shows download progressing smoothly
- State enum (PENDING, DOWNLOADING, COMPLETED, FAILED) tracks lifecycle clearly
- Percentage calculation: (downloaded / total) * 100; useful for progress bars
- Retry logic handles transient failures; common in network operations
- Thread naming with filename aids debugging; easy to identify which thread handles which file
- join() waits for all downloads; ensures complete before showing summary
- Progress updates at intervals prevent console spam; balance visibility vs performance
- Random failures simulate real-world network issues; tests retry logic
- AtomicInteger not needed here since each thread owns its DownloadTask exclusively
- Multiple concurrent downloads faster than sequential; exploits I/O parallelism
- Download speed simulation: sleep time = bytes / speed; realistic behavior
- Interrupt checking enables graceful cancellation; responsive to stop requests
- Summary statistics demonstrate thread coordination; all results collected after join()

---

### Exercise 13: Task Scheduler with Priority Threads and Background Monitoring

**📝 Problem Statement:**
Create a comprehensive task scheduling system demonstrating thread priorities, daemon threads for background monitoring, task queuing with priority-based execution, graceful shutdown coordination, and resource cleanup. The system should accept high-priority, normal-priority, and low-priority tasks, create threads with appropriate priorities for each task category, use a daemon monitoring thread to track system health and active tasks, display task execution order to show priority effects, simulate task execution with varying durations, handle task failures and retries, coordinate graceful shutdown when user initiates stop, ensure all non-daemon threads complete their work before exit, and generate execution reports showing priority-based scheduling effects, showcasing how thread priorities influence scheduling, daemon thread behavior, and proper thread lifecycle management in production systems.

**Requirements:**
- Create a Task class representing work to execute (id, name, priority, duration, category)
- Define three priority levels: HIGH (10), NORMAL (5), LOW (1) using Thread constants
- Create a TaskExecutor class implementing Runnable for executing tasks
- Launch separate threads for each task with appropriate priority setting
- Create a daemon monitoring thread that tracks: active tasks, completed tasks, failed tasks
- Monitor thread displays statistics every 2 seconds until all tasks complete
- Demonstrate priority effects: high-priority tasks tend to complete first (not guaranteed)
- Use meaningful thread names: "HighPriority-Task1", "NormalPriority-Task2", etc.
- Simulate task execution with Thread.sleep() for specified duration
- Handle task failures: random failures (10% chance), log and continue
- Implement graceful shutdown: signal to stop accepting new tasks
- Wait for all non-daemon threads to complete using join()
- Daemon monitoring thread automatically stops when all workers finish
- Track execution order to demonstrate priority scheduling effects
- Generate final report: tasks by priority, completion order, total execution time
- Display thread information: name, priority, state during execution

**Sample Test Cases:**
```
Input: Execute 15 tasks with mixed priorities
Tasks:
  5 High-priority tasks (2-3 seconds each)
  5 Normal-priority tasks (3-4 seconds each)
  5 Low-priority tasks (4-5 seconds each)

Expected Output:
=== Task Scheduler with Priorities ===

Creating 15 tasks...
✓ High-Priority-1 (Priority: 10, Duration: 2s)
✓ High-Priority-2 (Priority: 10, Duration: 3s)
✓ High-Priority-3 (Priority: 10, Duration: 2s)
✓ High-Priority-4 (Priority: 10, Duration: 3s)
✓ High-Priority-5 (Priority: 10, Duration: 2s)
✓ Normal-Priority-1 (Priority: 5, Duration: 3s)
✓ Normal-Priority-2 (Priority: 5, Duration: 4s)
✓ Normal-Priority-3 (Priority: 5, Duration: 3s)
✓ Normal-Priority-4 (Priority: 5, Duration: 4s)
✓ Normal-Priority-5 (Priority: 5, Duration: 3s)
✓ Low-Priority-1 (Priority: 1, Duration: 4s)
✓ Low-Priority-2 (Priority: 1, Duration: 5s)
✓ Low-Priority-3 (Priority: 1, Duration: 4s)
✓ Low-Priority-4 (Priority: 1, Duration: 5s)
✓ Low-Priority-5 (Priority: 1, Duration: 4s)

Starting task execution...
[Thread: HighPriority-High-Priority-1, Priority: 10] Executing High-Priority-1...
[Thread: HighPriority-High-Priority-2, Priority: 10] Executing High-Priority-2...
[Thread: HighPriority-High-Priority-3, Priority: 10] Executing High-Priority-3...
[Thread: HighPriority-High-Priority-4, Priority: 10] Executing High-Priority-4...
[Thread: HighPriority-High-Priority-5, Priority: 10] Executing High-Priority-5...
[Thread: NormalPriority-Normal-Priority-1, Priority: 5] Executing Normal-Priority-1...
[Thread: NormalPriority-Normal-Priority-2, Priority: 5] Executing Normal-Priority-2...
[Thread: NormalPriority-Normal-Priority-3, Priority: 5] Executing Normal-Priority-3...
[Thread: NormalPriority-Normal-Priority-4, Priority: 5] Executing Normal-Priority-4...
[Thread: NormalPriority-Normal-Priority-5, Priority: 5] Executing Normal-Priority-5...
[Thread: LowPriority-Low-Priority-1, Priority: 1] Executing Low-Priority-1...
[Thread: LowPriority-Low-Priority-2, Priority: 1] Executing Low-Priority-2...
[Thread: LowPriority-Low-Priority-3, Priority: 1] Executing Low-Priority-3...
[Thread: LowPriority-Low-Priority-4, Priority: 1] Executing Low-Priority-4...
[Thread: LowPriority-Low-Priority-5, Priority: 1] Executing Low-Priority-5...

[Monitor] === System Health Check ===
[Monitor] Active Tasks: 15
[Monitor] Completed: 0
[Monitor] Failed: 0
[Monitor] CPU Threads Active: 15

✓ High-Priority-1 completed (Execution time: 2.1s)
✓ High-Priority-3 completed (Execution time: 2.0s)
✓ High-Priority-5 completed (Execution time: 2.1s)

[Monitor] === System Health Check ===
[Monitor] Active Tasks: 12
[Monitor] Completed: 3
[Monitor] Failed: 0
[Monitor] CPU Threads Active: 12

✓ High-Priority-2 completed (Execution time: 3.0s)
✓ High-Priority-4 completed (Execution time: 3.1s)
✓ Normal-Priority-1 completed (Execution time: 3.2s)
✓ Normal-Priority-3 completed (Execution time: 3.1s)

[Monitor] === System Health Check ===
[Monitor] Active Tasks: 8
[Monitor] Completed: 7
[Monitor] Failed: 0
[Monitor] CPU Threads Active: 8

✓ Normal-Priority-2 completed (Execution time: 4.0s)
✓ Normal-Priority-5 completed (Execution time: 3.2s)
✗ Normal-Priority-4 failed (simulated error)
✓ Low-Priority-1 completed (Execution time: 4.1s)

[Monitor] === System Health Check ===
[Monitor] Active Tasks: 4
[Monitor] Completed: 10
[Monitor] Failed: 1
[Monitor] CPU Threads Active: 4

✓ Low-Priority-3 completed (Execution time: 4.2s)
✓ Low-Priority-5 completed (Execution time: 4.0s)
✓ Low-Priority-2 completed (Execution time: 5.1s)
✓ Low-Priority-4 completed (Execution time: 5.0s)

[Monitor] === System Health Check ===
[Monitor] Active Tasks: 0
[Monitor] Completed: 14
[Monitor] Failed: 1
[Monitor] All tasks completed - monitor exiting

=== Execution Report ===

Completion Order (demonstrates priority effects):
  1. High-Priority-1 (HIGH) - 2.1s
  2. High-Priority-3 (HIGH) - 2.0s
  3. High-Priority-5 (HIGH) - 2.1s
  4. High-Priority-2 (HIGH) - 3.0s
  5. High-Priority-4 (HIGH) - 3.1s
  6. Normal-Priority-1 (NORMAL) - 3.2s
  7. Normal-Priority-3 (NORMAL) - 3.1s
  8. Normal-Priority-2 (NORMAL) - 4.0s
  9. Normal-Priority-5 (NORMAL) - 3.2s
 10. Low-Priority-1 (LOW) - 4.1s
 11. Low-Priority-3 (LOW) - 4.2s
 12. Low-Priority-5 (LOW) - 4.0s
 13. Low-Priority-2 (LOW) - 5.1s
 14. Low-Priority-4 (LOW) - 5.0s

Failed Tasks:
  - Normal-Priority-4 (NORMAL)

Statistics by Priority:
  HIGH: 5 tasks completed, 0 failed (100% success rate)
  NORMAL: 4 tasks completed, 1 failed (80% success rate)
  LOW: 5 tasks completed, 0 failed (100% success rate)

Total Execution Time: 5.2 seconds
Scheduler Efficiency: High-priority tasks completed first (priority scheduling working)

All threads terminated. Application exiting.
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

// ============= Task Priority Enum =============

enum TaskPriority {
    HIGH(Thread.MAX_PRIORITY, "HIGH"),
    NORMAL(Thread.NORM_PRIORITY, "NORMAL"),
    LOW(Thread.MIN_PRIORITY, "LOW");

    private int threadPriority;
    private String name;

    TaskPriority(int threadPriority, String name) {
        this.threadPriority = threadPriority;
        this.name = name;
    }

    public int getThreadPriority() {
        return threadPriority;
    }

    public String getName() {
        return name;
    }
}

// ============= Task Class =============

class Task {
    private int id;
    private String name;
    private TaskPriority priority;
    private int durationSeconds;
    private long startTime;
    private long endTime;
    private boolean completed;
    private boolean failed;

    public Task(int id, String name, TaskPriority priority, int durationSeconds) {
        this.id = id;
        this.name = name;
        this.priority = priority;
        this.durationSeconds = durationSeconds;
        this.completed = false;
        this.failed = false;
    }

    // Getters and setters
    public int getId() { return id; }
    public String getName() { return name; }
    public TaskPriority getPriority() { return priority; }
    public int getDurationSeconds() { return durationSeconds; }
    public void setStartTime(long time) { this.startTime = time; }
    public void setEndTime(long time) { this.endTime = time; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public void setFailed(boolean failed) { this.failed = failed; }
    public boolean isCompleted() { return completed; }
    public boolean isFailed() { return failed; }

    public double getExecutionTime() {
        if (startTime == 0) return 0;
        long end = (endTime > 0) ? endTime : System.currentTimeMillis();
        return (end - startTime) / 1000.0;
    }
}

// ============= Task Executor Class =============

class TaskExecutor implements Runnable {
    private Task task;
    private List<Task> completedTasks;
    private Random random = new Random();

    public TaskExecutor(Task task, List<Task> completedTasks) {
        this.task = task;
        this.completedTasks = completedTasks;
    }

    @Override
    public void run() {
        Thread currentThread = Thread.currentThread();
        System.out.println("[Thread: " + currentThread.getName() +
            ", Priority: " + currentThread.getPriority() +
            "] Executing " + task.getName() + "...");

        task.setStartTime(System.currentTimeMillis());

        try {
            // Simulate task execution
            Thread.sleep(task.getDurationSeconds() * 1000);

            // Simulate random failures (10% chance)
            if (random.nextInt(10) == 0) {
                throw new RuntimeException("simulated error");
            }

            // Task completed successfully
            task.setEndTime(System.currentTimeMillis());
            task.setCompleted(true);
            completedTasks.add(task);

            System.out.printf("✓ %s completed (Execution time: %.1fs)%n",
                task.getName(), task.getExecutionTime());

        } catch (InterruptedException e) {
            System.out.println("✗ " + task.getName() + " was interrupted");
            task.setEndTime(System.currentTimeMillis());
            task.setFailed(true);
            Thread.currentThread().interrupt();

        } catch (Exception e) {
            System.out.println("✗ " + task.getName() + " failed (" + e.getMessage() + ")");
            task.setEndTime(System.currentTimeMillis());
            task.setFailed(true);
        }
    }
}

// ============= System Monitor (Daemon Thread) =============

class SystemMonitor implements Runnable {
    private List<Thread> activeThreads;
    private List<Task> completedTasks;
    private int totalTasks;
    private volatile boolean running = true;

    public SystemMonitor(List<Thread> activeThreads, List<Task> completedTasks,
                         int totalTasks) {
        this.activeThreads = activeThreads;
        this.completedTasks = completedTasks;
        this.totalTasks = totalTasks;
    }

    @Override
    public void run() {
        System.out.println();

        try {
            while (running) {
                Thread.sleep(2000);  // Check every 2 seconds

                displayHealthCheck();

                // Check if all tasks completed
                int active = countActiveThreads();
                if (active == 0 && completedTasks.size() >= totalTasks - countFailed()) {
                    System.out.println("[Monitor] All tasks completed - monitor exiting");
                    break;
                }
            }
        } catch (InterruptedException e) {
            System.out.println("[Monitor] Interrupted");
        }
    }

    private void displayHealthCheck() {
        int active = countActiveThreads();
        int completed = (int) completedTasks.stream().filter(Task::isCompleted).count();
        int failed = countFailed();

        System.out.println("\n[Monitor] === System Health Check ===");
        System.out.println("[Monitor] Active Tasks: " + active);
        System.out.println("[Monitor] Completed: " + completed);
        System.out.println("[Monitor] Failed: " + failed);
        System.out.println("[Monitor] CPU Threads Active: " + active);
        System.out.println();
    }

    private int countActiveThreads() {
        int count = 0;
        for (Thread thread : activeThreads) {
            if (thread.isAlive()) {
                count++;
            }
        }
        return count;
    }

    private int countFailed() {
        int failed = 0;
        for (Task task : completedTasks) {
            if (task.isFailed()) {
                failed++;
            }
        }
        return failed;
    }

    public void stop() {
        running = false;
    }
}

// ============= Main Task Scheduler =============

public class TestTaskScheduler {

    public static void main(String[] args) {
        System.out.println("=== Task Scheduler with Priorities ===\n");

        // Create tasks with different priorities
        System.out.println("Creating 15 tasks...");
        List<Task> tasks = createTasks();

        for (Task task : tasks) {
            System.out.printf("✓ %s (Priority: %d, Duration: %ds)%n",
                task.getName(),
                task.getPriority().getThreadPriority(),
                task.getDurationSeconds());
        }

        // Thread-safe list for completed tasks
        List<Task> completedTasks = new CopyOnWriteArrayList<>();

        // Create and start task executor threads
        System.out.println("\nStarting task execution...");
        List<Thread> threads = new ArrayList<>();

        for (Task task : tasks) {
            TaskExecutor executor = new TaskExecutor(task, completedTasks);
            String threadName = task.getPriority().getName() + "Priority-" + task.getName();
            Thread thread = new Thread(executor, threadName);

            // Set thread priority based on task priority
            thread.setPriority(task.getPriority().getThreadPriority());

            threads.add(thread);
            thread.start();
        }

        // Start daemon monitoring thread
        Thread monitor = new Thread(
            new SystemMonitor(threads, completedTasks, tasks.size()),
            "Monitor"
        );
        monitor.setDaemon(true);  // Daemon thread - exits when all non-daemon threads finish
        monitor.start();

        // Record start time
        long startTime = System.currentTimeMillis();

        // Wait for all task threads to complete
        try {
            for (Thread thread : threads) {
                thread.join();
            }
        } catch (InterruptedException e) {
            System.err.println("Main thread interrupted while waiting for tasks");
            e.printStackTrace();
        }

        // Calculate total time
        long endTime = System.currentTimeMillis();
        double totalSeconds = (endTime - startTime) / 1000.0;

        // Monitor daemon thread will automatically terminate now
        // (all non-daemon threads finished)

        // Display execution report
        displayExecutionReport(tasks, completedTasks, totalSeconds);

        System.out.println("\nAll threads terminated. Application exiting.");
    }

    private static List<Task> createTasks() {
        List<Task> tasks = new ArrayList<>();
        Random random = new Random();
        int id = 1;

        // Create 5 high-priority tasks
        for (int i = 1; i <= 5; i++) {
            tasks.add(new Task(id++, "High-Priority-" + i,
                TaskPriority.HIGH, 2 + random.nextInt(2)));
        }

        // Create 5 normal-priority tasks
        for (int i = 1; i <= 5; i++) {
            tasks.add(new Task(id++, "Normal-Priority-" + i,
                TaskPriority.NORMAL, 3 + random.nextInt(2)));
        }

        // Create 5 low-priority tasks
        for (int i = 1; i <= 5; i++) {
            tasks.add(new Task(id++, "Low-Priority-" + i,
                TaskPriority.LOW, 4 + random.nextInt(2)));
        }

        return tasks;
    }

    private static void displayExecutionReport(List<Task> allTasks,
            List<Task> completedTasks, double totalSeconds) {

        System.out.println("\n=== Execution Report ===\n");

        // Sort completed tasks by end time to show completion order
        List<Task> sortedCompleted = new ArrayList<>(completedTasks);
        sortedCompleted.sort((a, b) -> Long.compare(
            a.isCompleted() ? 0 : Long.MAX_VALUE,
            b.isCompleted() ? 0 : Long.MAX_VALUE));

        System.out.println("Completion Order (demonstrates priority effects):");
        int order = 1;
        for (Task task : sortedCompleted) {
            if (task.isCompleted()) {
                System.out.printf("%3d. %s (%s) - %.1fs%n",
                    order++,
                    task.getName(),
                    task.getPriority().getName(),
                    task.getExecutionTime());
            }
        }

        // Failed tasks
        System.out.println("\nFailed Tasks:");
        boolean hasFailed = false;
        for (Task task : allTasks) {
            if (task.isFailed()) {
                System.out.println("  - " + task.getName() +
                    " (" + task.getPriority().getName() + ")");
                hasFailed = true;
            }
        }
        if (!hasFailed) {
            System.out.println("  None");
        }

        // Statistics by priority
        System.out.println("\nStatistics by Priority:");
        for (TaskPriority priority : TaskPriority.values()) {
            long completed = allTasks.stream()
                .filter(t -> t.getPriority() == priority && t.isCompleted())
                .count();
            long failed = allTasks.stream()
                .filter(t -> t.getPriority() == priority && t.isFailed())
                .count();
            long total = allTasks.stream()
                .filter(t -> t.getPriority() == priority)
                .count();

            double successRate = total > 0 ? (completed * 100.0) / total : 0;

            System.out.printf("  %s: %d tasks completed, %d failed (%.0f%% success rate)%n",
                priority.getName(), completed, failed, successRate);
        }

        System.out.printf("\nTotal Execution Time: %.1f seconds%n", totalSeconds);
        System.out.println("Scheduler Efficiency: High-priority tasks completed first " +
            "(priority scheduling working)");
    }
}
```

</details>

**💡 Tips:**
- Thread priority is hint to scheduler; higher priority tasks tend to execute first but not guaranteed
- Use Thread.MIN_PRIORITY (1), Thread.NORM_PRIORITY (5), Thread.MAX_PRIORITY (10) constants
- setPriority() must be called before start(); changing priority after start has unpredictable effects
- Daemon threads automatically terminate when all non-daemon threads finish; perfect for monitoring
- setDaemon(true) must be called before start(); throws IllegalThreadStateException if called after
- Daemon threads should never perform critical operations (file I/O, database); no cleanup guarantees
- Priority effects more visible under CPU load; on idle systems, all threads may appear equal
- CopyOnWriteArrayList provides thread-safe iteration; no ConcurrentModificationException
- Thread naming aids debugging; priority prefix helps identify thread category
- join() waits for all workers; ensures all tasks complete before report generation
- Monitor thread displays periodic updates; daemon nature means automatic cleanup
- Task completion order demonstrates priority effects; high-priority tasks tend to finish first
- Random failures simulate real-world errors; tasks continue despite individual failures
- Thread.currentThread() provides access to executing thread; useful for logging thread info
- Don't rely on priority for correctness; use for optimization hints only

---

## 🔑 Key Takeaways

1. **Thread**: Lightweight subprocess for concurrent execution
2. **Two Ways to Create**: Extend Thread or implement Runnable (preferred)
3. **start() vs run()**: start() creates new thread, run() executes in current thread
4. **Thread Lifecycle**: NEW → RUNNABLE → RUNNING → TERMINATED
5. **sleep()**: Pauses thread execution for specified time
6. **join()**: Waits for thread to complete
7. **Priority**: Hint to scheduler (1-10), not a guarantee
8. **Daemon Threads**: Background threads that don't prevent JVM exit
9. **Thread Safety**: Multiple threads can cause race conditions (covered in Day 26)
10. **Best Practice**: Use Runnable interface for better design flexibility

---

## 📖 Additional Resources

### Official Documentation:
- [Java Thread Tutorial](https://docs.oracle.com/javase/tutorial/essential/concurrency/)
- [Thread Class Documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Thread.html)
- [Runnable Interface](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Runnable.html)

### Best Practices:
- Prefer Runnable over extending Thread
- Always handle InterruptedException
- Use meaningful thread names for debugging
- Be careful with thread priorities
- Avoid creating too many threads

---

## ⚠️ Common Mistakes

### 1. Thread Creation Mistakes

#### ❌ Wrong - Extending Thread When Runnable is Better:
```java
// WRONG - Extending Thread limits flexibility
public class Main {
    public static void main(String[] args) {
        class MyTask extends Thread {  // Can't extend another class now!
            @Override
            public void run() {
                System.out.println("Task running");
            }
        }

        MyTask task = new MyTask();
        task.start();
    }
}
```
**Issue:** Extending Thread prevents the class from extending any other class (Java single inheritance)

#### ✅ Right:
```java
// CORRECT - Implement Runnable for flexibility
public class Main {
    public static void main(String[] args) {
        class MyTask implements Runnable {  // Can still extend other classes
            @Override
            public void run() {
                System.out.println("Task running");
            }
        }

        Thread thread = new Thread(new MyTask());
        thread.start();

        // OR use lambda (Java 8+)
        Thread thread2 = new Thread(() -> System.out.println("Task running"));
        thread2.start();
    }
}
```

**Why:** Runnable is better design - separates task from thread mechanism; allows extending other classes.

**💡 Tip:** Prefer Runnable over extending Thread unless you need to override multiple Thread methods.

---

#### ❌ Wrong - Creating Thread But Not Overriding run():
```java
// WRONG - No run() method defined
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread();  // No task defined!
        thread.start();
        // Thread starts but does nothing
    }
}
```
**Issue:** Thread with no run() implementation does nothing; wastes resources

#### ✅ Right:
```java
// CORRECT - Define run() method
public class Main {
    public static void main(String[] args) {
        // Option 1: Anonymous Runnable
        Thread thread1 = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("Thread 1 running");
            }
        });
        thread1.start();

        // Option 2: Lambda expression
        Thread thread2 = new Thread(() -> System.out.println("Thread 2 running"));
        thread2.start();

        // Option 3: Implement Runnable class
        class MyTask implements Runnable {
            public void run() {
                System.out.println("Thread 3 running");
            }
        }
        Thread thread3 = new Thread(new MyTask());
        thread3.start();
    }
}
```

**Why:** Thread needs a task (run() method) to execute; otherwise it's useless.

**💡 Tip:** Always provide a Runnable or override run() when creating threads.

---

#### ❌ Wrong - Creating Too Many Threads:
```java
// WRONG - Creating thousands of threads
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 10000; i++) {
            Thread thread = new Thread(() -> {
                try {
                    Thread.sleep(10000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
            thread.start();  // 10,000 threads! System overload!
        }
    }
}
```
**Issue:** Too many threads consume excessive memory and CPU; causes system slowdown or crash

#### ✅ Right:
```java
// CORRECT - Use thread pool for many tasks
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        // Create thread pool with fixed number of threads
        ExecutorService executor = Executors.newFixedThreadPool(10);

        for (int i = 0; i < 10000; i++) {
            executor.submit(() -> {
                try {
                    Thread.sleep(10000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }

        executor.shutdown();
    }
}
```

**Why:** Thread pools reuse threads; efficient for handling many tasks with limited threads.

**💡 Tip:** Use ExecutorService thread pools for large numbers of tasks; avoid creating excessive threads.

---

#### ❌ Wrong - Not Reusing Runnable Instance:
```java
// WRONG - Creating new Runnable for each thread
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            Thread thread = new Thread(new Runnable() {
                public void run() {
                    System.out.println("Task");
                }
            });  // New Runnable object each time - wasteful
            thread.start();
        }
    }
}
```
**Issue:** Creating new Runnable instances unnecessarily; wastes memory

#### ✅ Right:
```java
// CORRECT - Reuse Runnable instance
public class Main {
    public static void main(String[] args) {
        Runnable task = () -> System.out.println("Task by " +
            Thread.currentThread().getName());

        // Reuse same Runnable for multiple threads
        for (int i = 0; i < 5; i++) {
            Thread thread = new Thread(task);
            thread.setName("Thread-" + i);
            thread.start();
        }
    }
}
```

**Why:** Single Runnable instance can be shared by multiple threads; more memory efficient.

**💡 Tip:** Reuse Runnable instances when the same task needs to run in multiple threads.

---

### 2. start() vs run() Mistakes

#### ❌ Wrong - Calling run() Instead of start():
```java
// WRONG - Calling run() directly
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            System.out.println("Thread: " + Thread.currentThread().getName());
        });

        thread.run();  // WRONG! Executes in main thread, not new thread
        // Output: Thread: main (runs in main thread!)
    }
}
```
**Issue:** `run()` executes in the current thread; doesn't create a new thread

#### ✅ Right:
```java
// CORRECT - Call start() to create new thread
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            System.out.println("Thread: " + Thread.currentThread().getName());
        });

        thread.start();  // Correct! Creates new thread
        // Output: Thread: Thread-0 (runs in new thread)
    }
}
```

**Why:** `start()` creates new thread and calls `run()` in that thread; `run()` just executes method normally.

**💡 Tip:** Always call `start()` to create a new thread; never call `run()` directly.

---

#### ❌ Wrong - Calling start() Multiple Times:
```java
// WRONG - Calling start() twice on same thread
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> System.out.println("Task"));

        thread.start();  // OK - first start
        thread.start();  // IllegalThreadStateException! Can't start again
    }
}
```
**Issue:** Thread can only be started once; second start() throws IllegalThreadStateException

#### ✅ Right:
```java
// CORRECT - Create new thread for each execution
public class Main {
    public static void main(String[] args) {
        Runnable task = () -> System.out.println("Task");

        Thread thread1 = new Thread(task);
        thread1.start();  // OK

        // To run again, create new thread
        Thread thread2 = new Thread(task);
        thread2.start();  // OK - new thread
    }
}
```

**Why:** Thread lifecycle: once terminated, can't be restarted; must create new thread.

**💡 Tip:** Create new Thread object for each execution; cannot reuse terminated threads.

---

#### ❌ Wrong - Not Understanding start() Creates Separate Execution:
```java
// WRONG expectation - sequential execution
public class Main {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread 1: " + i);
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread 2: " + i);
            }
        });

        thread1.start();
        thread2.start();

        // Student expects:
        // Thread 1: 0, Thread 1: 1, ..., Thread 1: 4, then Thread 2: 0, ...

        // Actual output: Interleaved!
        // Thread 1: 0, Thread 2: 0, Thread 1: 1, Thread 2: 1, ...
    }
}
```
**Issue:** Threads run concurrently; output order is unpredictable

#### ✅ Right:
```java
// CORRECT - Understand concurrent execution
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread 1: " + i);
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread 2: " + i);
            }
        });

        thread1.start();
        thread2.start();

        // Output is unpredictable - threads run concurrently
        // If you need sequential execution, use join():

        Thread thread3 = new Thread(() -> System.out.println("Task 3"));
        Thread thread4 = new Thread(() -> System.out.println("Task 4"));

        thread3.start();
        thread3.join();  // Wait for thread3 to finish
        thread4.start();  // Then start thread4
        thread4.join();
    }
}
```

**Why:** Multiple threads run concurrently; execution order is not guaranteed.

**💡 Tip:** Don't assume thread execution order; use join() if you need sequential execution.

---

#### ❌ Wrong - Mixing run() and start() Calls:
```java
// WRONG - Confusing run() and start()
public class Main {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> System.out.println("Thread 1"));
        Thread thread2 = new Thread(() -> System.out.println("Thread 2"));

        thread1.start();  // Creates new thread
        thread2.run();    // Runs in main thread! Inconsistent!
    }
}
```
**Issue:** Mixing start() and run() creates inconsistent behavior; hard to debug

#### ✅ Right:
```java
// CORRECT - Consistently use start()
public class Main {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> System.out.println("Thread 1"));
        Thread thread2 = new Thread(() -> System.out.println("Thread 2"));

        thread1.start();  // Creates new thread
        thread2.start();  // Creates new thread

        // Both run concurrently in separate threads
    }
}
```

**Why:** Consistent use of start() ensures all tasks run in separate threads as expected.

**💡 Tip:** Always use start() to create threads; avoid calling run() directly unless testing.

---

### 3. sleep() Method Mistakes

#### ❌ Wrong - Not Handling InterruptedException:
```java
// WRONG - Ignoring InterruptedException
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            Thread.sleep(1000);  // Compile error! Must handle InterruptedException
        });
        thread.start();
    }
}
```
**Issue:** `sleep()` throws checked InterruptedException; must be caught or declared

#### ✅ Right:
```java
// CORRECT - Handle InterruptedException
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(1000);  // Sleep for 1 second
                System.out.println("Woke up!");
            } catch (InterruptedException e) {
                System.out.println("Sleep interrupted!");
                // Restore interrupt status
                Thread.currentThread().interrupt();
            }
        });
        thread.start();
    }
}
```

**Why:** sleep() can be interrupted; must handle exception properly.

**💡 Tip:** Always wrap sleep() in try-catch; restore interrupt status in catch block.

---

#### ❌ Wrong - Using sleep() for Synchronization:
```java
// WRONG - Using sleep() to wait for another thread
public class Main {
    static boolean dataReady = false;

    public static void main(String[] args) throws InterruptedException {
        Thread producer = new Thread(() -> {
            try {
                Thread.sleep(2000);  // Simulate work
                dataReady = true;
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        producer.start();

        // WRONG - Guessing how long to sleep
        Thread.sleep(3000);  // Hope producer is done by now?
        System.out.println("Data ready: " + dataReady);
    }
}
```
**Issue:** Using sleep() to guess when another thread finishes is unreliable; timing dependent

#### ✅ Right:
```java
// CORRECT - Use join() to wait for thread completion
public class Main {
    static boolean dataReady = false;

    public static void main(String[] args) throws InterruptedException {
        Thread producer = new Thread(() -> {
            try {
                Thread.sleep(2000);  // Simulate work
                dataReady = true;
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        producer.start();

        // Correct - Wait for producer to actually finish
        producer.join();
        System.out.println("Data ready: " + dataReady);  // Guaranteed true
    }
}
```

**Why:** join() waits for thread to finish; sleep() just pauses for fixed time (unreliable).

**💡 Tip:** Use join() to wait for thread completion, not sleep(); sleep() is for pausing, not synchronization.

---

#### ❌ Wrong - Sleeping with Negative or Zero Duration:
```java
// WRONG - Invalid sleep duration
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(-1000);  // IllegalArgumentException!
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        thread.start();
    }
}
```
**Issue:** Negative duration throws IllegalArgumentException; zero duration is legal but pointless

#### ✅ Right:
```java
// CORRECT - Use positive duration
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(1000);  // Positive milliseconds
                System.out.println("Slept for 1 second");

                // Zero is legal (yields to other threads) but rarely useful
                Thread.sleep(0);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        thread.start();
    }
}
```

**Why:** sleep() requires non-negative duration; negative throws exception.

**💡 Tip:** Use positive milliseconds for sleep(); zero is legal but rarely needed.

---

#### ❌ Wrong - Not Understanding sleep() Doesn't Release Locks:
```java
// WRONG - Expecting sleep() to release monitor lock
public class Main {
    public static void main(String[] args) {
        Object lock = new Object();

        Thread thread1 = new Thread(() -> {
            synchronized (lock) {
                System.out.println("Thread 1 acquired lock");
                try {
                    Thread.sleep(3000);  // Holds lock while sleeping!
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("Thread 1 releasing lock");
            }
        });

        Thread thread2 = new Thread(() -> {
            synchronized (lock) {  // Waits for 3 seconds!
                System.out.println("Thread 2 acquired lock");
            }
        });

        thread1.start();
        thread2.start();
        // Thread 2 blocked for 3 seconds even though Thread 1 is just sleeping
    }
}
```
**Issue:** sleep() doesn't release monitor locks; other threads still blocked

#### ✅ Right:
```java
// CORRECT - Understand sleep() behavior with locks
public class Main {
    public static void main(String[] args) {
        Object lock = new Object();

        Thread thread1 = new Thread(() -> {
            synchronized (lock) {
                System.out.println("Thread 1 acquired lock");
                try {
                    // sleep() holds the lock - other threads wait
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("Thread 1 releasing lock");
            }
        });

        Thread thread2 = new Thread(() -> {
            synchronized (lock) {
                System.out.println("Thread 2 acquired lock");
            }
        });

        thread1.start();
        thread2.start();

        // If you need to release lock while waiting, use wait() instead (Day 26)
    }
}
```

**Why:** sleep() holds monitor locks; wait() releases locks (covered in Day 26).

**💡 Tip:** sleep() = pause without releasing locks; wait() = pause and release locks (Day 26).

---

### 4. join() Method Mistakes

#### ❌ Wrong - Not Understanding join() Blocks Current Thread:
```java
// WRONG expectation - thinking join() doesn't block
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(3000);
                System.out.println("Worker done");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        thread.start();
        thread.join();  // Main thread waits here for 3 seconds!
        System.out.println("Main done");  // Prints after "Worker done"
    }
}
```
**Issue:** join() blocks the calling thread until the target thread completes

#### ✅ Right:
```java
// CORRECT - Understand join() blocks
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(3000);
                System.out.println("Worker done");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        thread.start();
        System.out.println("Main: Started worker");

        // Main thread blocks here and waits for worker to finish
        thread.join();
        System.out.println("Main: Worker finished, now continuing");

        // Use join() when you need to wait for thread completion
        // Don't use join() if you want concurrent execution
    }
}
```

**Why:** join() makes calling thread wait until target thread terminates.

**💡 Tip:** Use join() when you need to wait for thread completion; understand it blocks the calling thread.

---

#### ❌ Wrong - Joining Thread on Itself:
```java
// WRONG - Thread joining itself
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            try {
                Thread.currentThread().join();  // Deadlock! Thread waits for itself
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        thread.start();
        // Thread hangs forever waiting for itself to finish!
    }
}
```
**Issue:** Thread cannot join itself; causes deadlock (waits forever)

#### ✅ Right:
```java
// CORRECT - Join other threads, not self
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            System.out.println("Thread 1 running");
        });

        Thread thread2 = new Thread(() -> {
            try {
                thread1.join();  // Thread 2 waits for Thread 1
                System.out.println("Thread 2 running after Thread 1");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        thread1.start();
        thread2.start();

        thread2.join();  // Main waits for thread 2
        System.out.println("Main done");
    }
}
```

**Why:** Thread joining itself creates circular wait; join other threads, not current thread.

**💡 Tip:** Never call join() on current thread; only join other threads.

---

#### ❌ Wrong - Not Handling InterruptedException from join():
```java
// WRONG - Not handling join's InterruptedException
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        thread.start();
        thread.join();  // Compile error! Must handle InterruptedException
    }
}
```
**Issue:** join() throws checked InterruptedException; must be caught or declared

#### ✅ Right:
```java
// CORRECT - Handle InterruptedException
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        thread.start();

        try {
            thread.join();  // Wait for thread to finish
            System.out.println("Thread finished");
        } catch (InterruptedException e) {
            System.out.println("Wait interrupted");
            e.printStackTrace();
        }
    }
}
```

**Why:** join() can be interrupted; must handle exception.

**💡 Tip:** Always wrap join() in try-catch or declare throws InterruptedException.

---

#### ❌ Wrong - Joining Threads in Wrong Order Causing Deadlock:
```java
// WRONG - Circular join dependency
public class Main {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            try {
                thread2.join();  // Thread 1 waits for Thread 2
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        Thread thread2 = new Thread(() -> {
            try {
                thread1.join();  // Thread 2 waits for Thread 1 - Deadlock!
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        thread1.start();
        thread2.start();
        // Both threads wait for each other - deadlock!
    }
}
```
**Issue:** Circular join dependencies cause deadlock; threads wait for each other forever

#### ✅ Right:
```java
// CORRECT - Proper join order
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            System.out.println("Thread 1 running");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        Thread thread2 = new Thread(() -> {
            try {
                thread1.join();  // Thread 2 waits for Thread 1 (one-way dependency)
                System.out.println("Thread 2 running after Thread 1");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        thread1.start();
        thread2.start();

        thread2.join();  // Main waits for thread 2
        System.out.println("All done");
    }
}
```

**Why:** One-way join dependencies are safe; circular dependencies cause deadlock.

**💡 Tip:** Design thread dependencies carefully; avoid circular waits.

---

### 5. Thread Priority Mistakes

#### ❌ Wrong - Relying on Priority for Correctness:
```java
// WRONG - Assuming high priority thread always runs first
public class Main {
    static int counter = 0;

    public static void main(String[] args) throws InterruptedException {
        Thread highPriority = new Thread(() -> {
            counter = 1;
            System.out.println("High priority set counter to 1");
        });

        Thread lowPriority = new Thread(() -> {
            counter = 2;
            System.out.println("Low priority set counter to 2");
        });

        highPriority.setPriority(Thread.MAX_PRIORITY);  // 10
        lowPriority.setPriority(Thread.MIN_PRIORITY);    // 1

        lowPriority.start();
        highPriority.start();

        Thread.sleep(100);
        // Assuming counter is 1 because high priority runs first - WRONG!
        // Priority is just a hint; not guaranteed
        System.out.println("Counter: " + counter);  // Could be 1 or 2!
    }
}
```
**Issue:** Thread priority is hint to scheduler; doesn't guarantee execution order

#### ✅ Right:
```java
// CORRECT - Don't rely on priority for correctness
public class Main {
    static int counter = 0;

    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            counter = 1;
            System.out.println("Thread 1 set counter to 1");
        });

        Thread thread2 = new Thread(() -> {
            counter = 2;
            System.out.println("Thread 2 set counter to 2");
        });

        // If you need specific order, use join()
        thread1.start();
        thread1.join();  // Wait for thread1 to finish

        thread2.start();
        thread2.join();

        System.out.println("Counter: " + counter);  // Guaranteed to be 2

        // Priority is for optimization, not correctness
        // Use synchronization (Day 26) for shared data access
    }
}
```

**Why:** Priority is scheduler hint; use synchronization and join() for correctness.

**💡 Tip:** Never rely on priority for correct execution order; use proper synchronization.

---

#### ❌ Wrong - Setting Invalid Priority Values:
```java
// WRONG - Invalid priority value
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> System.out.println("Task"));
        thread.setPriority(15);  // IllegalArgumentException! Valid range: 1-10
        thread.start();
    }
}
```
**Issue:** Priority must be 1-10; invalid values throw IllegalArgumentException

#### ✅ Right:
```java
// CORRECT - Use valid priority range
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> System.out.println("Task"));

        // Valid priority values
        thread.setPriority(Thread.MIN_PRIORITY);   // 1
        thread.setPriority(Thread.NORM_PRIORITY);  // 5 (default)
        thread.setPriority(Thread.MAX_PRIORITY);   // 10

        // Or use custom value between 1-10
        thread.setPriority(7);  // OK

        thread.start();
    }
}
```

**Why:** Valid priority range is 1-10 (MIN_PRIORITY to MAX_PRIORITY).

**💡 Tip:** Use Thread constants (MIN_PRIORITY, NORM_PRIORITY, MAX_PRIORITY) for clarity.

---

#### ❌ Wrong - Changing Priority After Thread Starts:
```java
// WRONG expectation - priority change immediately affects running thread
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            for (int i = 0; i < 1000000; i++) {
                // Long running task
                if (i % 100000 == 0) {
                    System.out.println(i);
                }
            }
        });

        thread.setPriority(Thread.MIN_PRIORITY);
        thread.start();

        Thread.sleep(100);
        thread.setPriority(Thread.MAX_PRIORITY);  // Change priority mid-execution
        // Effect not guaranteed; scheduler dependent
    }
}
```
**Issue:** Changing priority of running thread may not have immediate or predictable effect

#### ✅ Right:
```java
// CORRECT - Set priority before starting thread
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            for (int i = 0; i < 1000000; i++) {
                if (i % 100000 == 0) {
                    System.out.println(i);
                }
            }
        });

        // Set priority BEFORE starting
        thread.setPriority(Thread.MAX_PRIORITY);
        thread.start();

        // Don't change priority of running thread
        // Priority is best set once before start()
    }
}
```

**Why:** Set priority before starting thread; changing mid-execution has unpredictable effects.

**💡 Tip:** Set thread priority once before calling start(); avoid changing during execution.

---

#### ❌ Wrong - Not Understanding Platform Dependence:
```java
// WRONG - Expecting same priority behavior on all platforms
public class Main {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                System.out.println("Thread 1: " + i);
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                System.out.println("Thread 2: " + i);
            }
        });

        thread1.setPriority(Thread.MAX_PRIORITY);
        thread2.setPriority(Thread.MIN_PRIORITY);

        thread1.start();
        thread2.start();

        // Expecting consistent behavior across all OSes - WRONG!
        // Some OSes ignore Java thread priorities
    }
}
```
**Issue:** Thread priority behavior is platform-dependent; not consistent across OSes

#### ✅ Right:
```java
// CORRECT - Understand priority is platform-dependent hint
public class Main {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                System.out.println("Thread 1: " + i);
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                System.out.println("Thread 2: " + i);
            }
        });

        // Set priorities as hints for optimization
        thread1.setPriority(Thread.MAX_PRIORITY);
        thread2.setPriority(Thread.MIN_PRIORITY);

        thread1.start();
        thread2.start();

        // But don't rely on priority for correct behavior
        // Use proper synchronization and coordination (join, locks, etc.)
    }
}
```

**Why:** Priority is scheduler hint; behavior varies by platform and JVM.

**💡 Tip:** Treat priority as optimization hint; don't depend on it for correctness.

---

### 6. Daemon Thread Mistakes

#### ❌ Wrong - Not Setting Daemon Before start():
```java
// WRONG - Setting daemon after start()
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            while (true) {
                try {
                    Thread.sleep(1000);
                    System.out.println("Running...");
                } catch (InterruptedException e) {
                    break;
                }
            }
        });

        thread.start();
        thread.setDaemon(true);  // IllegalThreadStateException! Too late!
    }
}
```
**Issue:** Must set daemon status BEFORE calling start(); throws IllegalThreadStateException if called after

#### ✅ Right:
```java
// CORRECT - Set daemon before start()
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            int count = 0;
            while (true) {
                try {
                    Thread.sleep(1000);
                    System.out.println("Running... " + (++count));
                } catch (InterruptedException e) {
                    break;
                }
            }
        });

        thread.setDaemon(true);  // MUST be before start()
        thread.start();

        Thread.sleep(3000);  // Main runs for 3 seconds
        System.out.println("Main ending");
        // Daemon thread automatically terminates when main ends
    }
}
```

**Why:** Daemon status must be set before thread starts; can't change after.

**💡 Tip:** Always call setDaemon() before start(); otherwise IllegalThreadStateException.

---

#### ❌ Wrong - Using Daemon Threads for Critical Tasks:
```java
// WRONG - Critical task in daemon thread
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread saveThread = new Thread(() -> {
            System.out.println("Saving important data...");
            try {
                Thread.sleep(5000);  // Simulate long save operation
                System.out.println("Data saved!");  // May never print!
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        saveThread.setDaemon(true);  // WRONG! Critical task shouldn't be daemon
        saveThread.start();

        Thread.sleep(100);  // Main ends quickly
        System.out.println("Main ending");
        // Daemon thread terminates abruptly - data not saved!
    }
}
```
**Issue:** Daemon threads terminate abruptly when all non-daemon threads end; data loss risk

#### ✅ Right:
```java
// CORRECT - Use regular thread for critical tasks
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread saveThread = new Thread(() -> {
            System.out.println("Saving important data...");
            try {
                Thread.sleep(5000);
                System.out.println("Data saved!");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        // Don't set as daemon - let it complete
        saveThread.start();

        // Wait for save to complete
        saveThread.join();
        System.out.println("Main ending");
        // Data safely saved before JVM exits

        // Use daemon threads only for background tasks like:
        // - Garbage collection
        // - Monitoring
        // - Logging
        // - Auto-save (with proper shutdown hooks)
    }
}
```

**Why:** Daemon threads for non-critical background tasks; regular threads for critical work.

**💡 Tip:** Never use daemon threads for critical operations (file I/O, database, etc.); use for monitoring, logging only.

---

#### ❌ Wrong - Not Understanding Daemon Thread Inheritance:
```java
// WRONG - Assuming child threads are always non-daemon
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread daemonThread = new Thread(() -> {
            Thread childThread = new Thread(() -> {
                try {
                    Thread.sleep(5000);
                    System.out.println("Child running");  // May not print!
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
            // Assuming childThread is non-daemon - WRONG!
            // childThread inherits daemon status from parent
            childThread.start();
        });

        daemonThread.setDaemon(true);
        daemonThread.start();

        Thread.sleep(100);
        System.out.println("Main ending");
        // Both daemon parent and child terminate when main ends
    }
}
```
**Issue:** Child threads inherit daemon status from parent thread

#### ✅ Right:
```java
// CORRECT - Understand daemon inheritance
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread daemonThread = new Thread(() -> {
            Thread childThread = new Thread(() -> {
                try {
                    Thread.sleep(5000);
                    System.out.println("Child running");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });

            // Child inherits daemon status from parent
            System.out.println("Child is daemon: " + childThread.isDaemon());  // true

            // Explicitly set if you want different behavior
            childThread.setDaemon(false);  // Make child non-daemon
            childThread.start();
        });

        daemonThread.setDaemon(true);
        daemonThread.start();

        Thread.sleep(100);
        System.out.println("Main ending");
        // Child is non-daemon, so JVM waits for it to complete
    }
}
```

**Why:** Threads inherit daemon status from creating thread; set explicitly if needed.

**💡 Tip:** Child threads inherit parent's daemon status; explicitly set setDaemon() if you need different behavior.

---

#### ❌ Wrong - Expecting Daemon Thread Finally Blocks to Run:
```java
// WRONG - Expecting finally in daemon thread to run
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread daemon = new Thread(() -> {
            try {
                while (true) {
                    Thread.sleep(1000);
                    System.out.println("Working...");
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                System.out.println("Cleanup in finally");  // May not run!
            }
        });

        daemon.setDaemon(true);
        daemon.start();

        Thread.sleep(2500);
        System.out.println("Main ending");
        // Daemon thread terminates abruptly - finally block may not execute!
    }
}
```
**Issue:** Daemon threads can terminate without running finally blocks; no cleanup guarantees

#### ✅ Right:
```java
// CORRECT - Don't rely on daemon finally blocks
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread daemon = new Thread(() -> {
            try {
                while (true) {
                    Thread.sleep(1000);
                    System.out.println("Working...");
                }
            } catch (InterruptedException e) {
                System.out.println("Interrupted - cleaning up");
                // Cleanup here in catch block when interrupted
            }
        });

        daemon.setDaemon(true);
        daemon.start();

        Thread.sleep(2500);

        // For critical cleanup, use regular thread with proper shutdown
        // Or use shutdown hooks
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("Shutdown hook - guaranteed to run");
        }));

        System.out.println("Main ending");
    }
}
```

**Why:** Daemon threads can stop abruptly; use shutdown hooks for critical cleanup.

**💡 Tip:** Don't rely on daemon thread finally blocks; use shutdown hooks for important cleanup.

---

### 7. Thread State Mistakes

#### ❌ Wrong - Checking State Without Synchronization:
```java
// WRONG - Race condition checking thread state
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            System.out.println("Running");
        });

        thread.start();

        // Race condition - state may change between check and action
        if (thread.getState() == Thread.State.RUNNABLE) {
            System.out.println("Thread is running");
            // But thread might have finished by now!
        }
    }
}
```
**Issue:** Thread state can change immediately after checking; race condition

#### ✅ Right:
```java
// CORRECT - Use proper coordination (join, synchronization)
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            System.out.println("Running");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        thread.start();

        // Don't rely on state for coordination
        // Use join() to wait for completion
        thread.join();

        // Now guaranteed thread is TERMINATED
        System.out.println("Thread state: " + thread.getState());  // TERMINATED

        // Use getState() for monitoring/debugging, not coordination
    }
}
```

**Why:** getState() is snapshot; state changes immediately; use join/synchronization for coordination.

**💡 Tip:** Use getState() for debugging/monitoring only; use join() for actual coordination.

---

#### ❌ Wrong - Expecting Specific State Transitions:
```java
// WRONG - Expecting all states to be observable
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            System.out.println("Running");
        });

        System.out.println("State: " + thread.getState());  // NEW
        thread.start();
        System.out.println("State: " + thread.getState());  // Expecting RUNNABLE
        // Might see TERMINATED if thread finishes very quickly!

        // Can't guarantee seeing specific states
    }
}
```
**Issue:** Very short-lived threads may skip observable states; can't guarantee seeing all states

#### ✅ Right:
```java
// CORRECT - Understand state transitions are not always observable
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            System.out.println("Running");
            try {
                Thread.sleep(100);  // Long enough to observe
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        System.out.println("State: " + thread.getState());  // NEW

        thread.start();
        Thread.sleep(10);  // Give thread time to start
        System.out.println("State: " + thread.getState());  // Likely RUNNABLE or TIMED_WAITING

        thread.join();
        System.out.println("State: " + thread.getState());  // TERMINATED

        // States: NEW → RUNNABLE → (BLOCKED/WAITING/TIMED_WAITING) → TERMINATED
        // Not all intermediate states are guaranteed to be observable
    }
}
```

**Why:** Thread states transition quickly; may skip observable states especially for short tasks.

**💡 Tip:** Don't assume you'll observe all state transitions; use getState() for snapshots only.

---

#### ❌ Wrong - Confusing RUNNABLE with Actually Running:
```java
// WRONG - Thinking RUNNABLE means currently executing
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 1000000; i++) {
                // Long computation
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 1000000; i++) {
                // Long computation
            }
        });

        thread1.start();
        thread2.start();

        Thread.sleep(10);

        // Both show RUNNABLE, but only one is actually running on single-core CPU
        System.out.println("Thread 1: " + thread1.getState());  // RUNNABLE
        System.out.println("Thread 2: " + thread2.getState());  // RUNNABLE
        // Student thinks both are executing simultaneously - WRONG on single core!
    }
}
```
**Issue:** RUNNABLE means eligible to run, not necessarily currently executing on CPU

#### ✅ Right:
```java
// CORRECT - Understand RUNNABLE state
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 1000000; i++) {
                // Long computation
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 1000000; i++) {
                // Long computation
            }
        });

        thread1.start();
        thread2.start();

        Thread.sleep(10);

        // RUNNABLE = eligible to run (in OS scheduler's ready queue)
        // Might be executing, or waiting for CPU time slice
        System.out.println("Thread 1: " + thread1.getState());  // RUNNABLE
        System.out.println("Thread 2: " + thread2.getState());  // RUNNABLE

        // On single-core: threads alternate (time slicing)
        // On multi-core: may run simultaneously
        // RUNNABLE doesn't distinguish between executing and ready-to-execute
    }
}
```

**Why:** RUNNABLE = ready to run or currently running; Java doesn't distinguish between them.

**💡 Tip:** RUNNABLE means eligible to run, not necessarily executing; scheduler controls actual execution.

---

#### ❌ Wrong - Not Understanding BLOCKED vs WAITING:
```java
// WRONG - Confusing BLOCKED and WAITING states
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Object lock = new Object();

        Thread thread1 = new Thread(() -> {
            synchronized (lock) {
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread thread2 = new Thread(() -> {
            synchronized (lock) {  // Waiting for lock
                System.out.println("Thread 2 got lock");
            }
        });

        thread1.start();
        Thread.sleep(100);  // Let thread1 acquire lock
        thread2.start();
        Thread.sleep(100);

        // Student expects WAITING - WRONG!
        System.out.println("Thread 2 state: " + thread2.getState());  // BLOCKED
        // BLOCKED = waiting for monitor lock
        // WAITING = waiting for another thread's action (wait(), join())
    }
}
```
**Issue:** BLOCKED = waiting for lock; WAITING = waiting for notification/join

#### ✅ Right:
```java
// CORRECT - Understand difference between BLOCKED and WAITING
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Object lock = new Object();

        // Example 1: BLOCKED state
        Thread thread1 = new Thread(() -> {
            synchronized (lock) {
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread thread2 = new Thread(() -> {
            synchronized (lock) {  // Trying to acquire lock
                System.out.println("Thread 2 got lock");
            }
        });

        thread1.start();
        Thread.sleep(100);
        thread2.start();
        Thread.sleep(100);

        System.out.println("Thread 2 state: " + thread2.getState());  // BLOCKED

        // Example 2: WAITING state
        Thread thread3 = new Thread(() -> {
            try {
                thread1.join();  // Wait for thread1 to complete
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        thread3.start();
        Thread.sleep(100);

        System.out.println("Thread 3 state: " + thread3.getState());  // WAITING

        // BLOCKED = waiting to enter synchronized block (monitor lock)
        // WAITING = waiting for another thread (wait(), join())
        // TIMED_WAITING = waiting with timeout (sleep(), wait(timeout), join(timeout))
    }
}
```

**Why:** BLOCKED is monitor-specific; WAITING/TIMED_WAITING from wait/join/sleep.

**💡 Tip:** BLOCKED = lock wait; WAITING = notification/join wait; TIMED_WAITING = timeout wait.

---

### 8. Thread Interruption Mistakes

#### ❌ Wrong - Ignoring InterruptedException:
```java
// WRONG - Empty catch block for InterruptedException
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                // Empty - ignores interruption!
            }
            System.out.println("Continuing after interruption");
        });

        thread.start();
        Thread.sleep(1000);
        thread.interrupt();  // Interrupt the thread
        // Thread catches exception but ignores it - bad practice
    }
}
```
**Issue:** Ignoring InterruptedException loses interruption signal; thread doesn't respond properly

#### ✅ Right:
```java
// CORRECT - Handle InterruptedException properly
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted - cleaning up");
                // Restore interrupt status
                Thread.currentThread().interrupt();
                return;  // Exit thread gracefully
            }
            System.out.println("Normal completion");
        });

        thread.start();
        Thread.sleep(1000);
        thread.interrupt();

        thread.join();
        System.out.println("Thread finished");
    }
}
```

**Why:** InterruptedException signals cancellation request; handle gracefully and restore status.

**💡 Tip:** Never ignore InterruptedException; log it, restore status, and exit gracefully.

---

#### ❌ Wrong - Not Checking Interrupt Status in Long Loops:
```java
// WRONG - Long loop without checking interrupt status
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            for (int i = 0; i < 1000000; i++) {
                // Long running computation
                Math.sqrt(i);
                // No interrupt check - can't stop this thread!
            }
            System.out.println("Done");
        });

        thread.start();
        Thread.sleep(100);
        thread.interrupt();  // Has no effect! Loop continues

        thread.join();  // Waits for entire loop to finish
    }
}
```
**Issue:** Interrupting thread with no blocking calls or interrupt checks has no effect

#### ✅ Right:
```java
// CORRECT - Check interrupt status in loops
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            for (int i = 0; i < 1000000; i++) {
                // Check interrupt status periodically
                if (Thread.currentThread().isInterrupted()) {
                    System.out.println("Interrupted at iteration " + i);
                    return;  // Exit gracefully
                }

                // Long running computation
                Math.sqrt(i);
            }
            System.out.println("Done");
        });

        thread.start();
        Thread.sleep(100);
        thread.interrupt();

        thread.join();
        System.out.println("Thread stopped");
    }
}
```

**Why:** Must check isInterrupted() in loops that don't have blocking calls.

**💡 Tip:** Check Thread.currentThread().isInterrupted() periodically in long loops.

---

#### ❌ Wrong - Clearing Interrupt Status Unintentionally:
```java
// WRONG - Clearing interrupt status without restoring
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            while (!Thread.interrupted()) {  // Clears interrupt status!
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    // Interrupt status already cleared by interrupted()
                    // Can't check it again!
                    System.out.println("Interrupted");
                    break;
                }
            }
        });

        thread.start();
        Thread.sleep(500);
        thread.interrupt();

        thread.join();
    }
}
```
**Issue:** Thread.interrupted() clears interrupt status; can only check once

#### ✅ Right:
```java
// CORRECT - Use isInterrupted() or restore status
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            // Option 1: Use isInterrupted() (doesn't clear status)
            while (!Thread.currentThread().isInterrupted()) {
                try {
                    Thread.sleep(1000);
                    System.out.println("Working...");
                } catch (InterruptedException e) {
                    System.out.println("Interrupted - exiting");
                    Thread.currentThread().interrupt();  // Restore status
                    break;
                }
            }
            System.out.println("Thread ending");
        });

        thread.start();
        Thread.sleep(2500);
        thread.interrupt();

        thread.join();
    }
}
```

**Why:** isInterrupted() checks without clearing; interrupted() checks and clears.

**💡 Tip:** Use isInterrupted() to check status; interrupted() clears it.

---

#### ❌ Wrong - Not Propagating InterruptedException:
```java
// WRONG - Swallowing InterruptedException in utility method
public class Main {
    static void doWork() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            // Swallowed! Caller doesn't know about interruption
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            doWork();
            System.out.println("Continuing");  // Continues despite interruption!
        });

        thread.start();
        Thread.sleep(1000);
        thread.interrupt();

        thread.join();
    }
}
```
**Issue:** Catching InterruptedException in utility method hides interruption from caller

#### ✅ Right:
```java
// CORRECT - Propagate or restore interrupt status
public class Main {
    // Option 1: Declare throws InterruptedException
    static void doWork1() throws InterruptedException {
        Thread.sleep(5000);
        // Let exception propagate to caller
    }

    // Option 2: Restore interrupt status
    static void doWork2() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            // Restore interrupt status for caller to check
            Thread.currentThread().interrupt();
            System.out.println("Work interrupted");
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            try {
                doWork1();  // Propagates exception
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted");
                return;  // Exit
            }
            System.out.println("Continuing");
        });

        thread.start();
        Thread.sleep(1000);
        thread.interrupt();

        thread.join();
    }
}
```

**Why:** Caller needs to know about interruption; propagate exception or restore status.

**💡 Tip:** In utility methods, either declare throws InterruptedException or call Thread.currentThread().interrupt().

---

### 9. Thread Lifecycle and Management Mistakes

#### ❌ Wrong - Not Naming Threads:
```java
// WRONG - Default thread names hard to debug
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            Thread thread = new Thread(() -> {
                System.out.println("Running in " + Thread.currentThread().getName());
            });
            thread.start();  // Names: Thread-0, Thread-1, ... (not descriptive)
        }
    }
}
```
**Issue:** Default names (Thread-0, Thread-1) not descriptive; hard to debug

#### ✅ Right:
```java
// CORRECT - Use meaningful thread names
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            Thread thread = new Thread(() -> {
                System.out.println("Running in " + Thread.currentThread().getName());
            });
            thread.setName("Worker-" + i);  // Descriptive name
            thread.start();
        }

        // OR set name in constructor
        for (int i = 0; i < 5; i++) {
            Thread thread = new Thread(() -> {
                System.out.println("Running in " + Thread.currentThread().getName());
            }, "Task-" + i);  // Name in constructor
            thread.start();
        }
    }
}
```

**Why:** Meaningful names aid debugging, logging, and thread dumps.

**💡 Tip:** Always name threads descriptively using setName() or Thread constructor.

---

#### ❌ Wrong - Not Handling Uncaught Exceptions:
```java
// WRONG - Uncaught exception terminates thread silently
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            System.out.println("Starting");
            throw new RuntimeException("Oops!");  // Exception terminates thread silently!
        });

        thread.start();
        thread.join();
        System.out.println("Done");  // Prints without knowing thread crashed
    }
}
```
**Issue:** Uncaught exceptions terminate thread silently; no logging or recovery

#### ✅ Right:
```java
// CORRECT - Set uncaught exception handler
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            System.out.println("Starting");
            throw new RuntimeException("Oops!");
        });

        // Set exception handler
        thread.setUncaughtExceptionHandler((t, e) -> {
            System.err.println("Thread " + t.getName() + " threw exception: " + e.getMessage());
            e.printStackTrace();
            // Log error, alert monitoring, attempt recovery, etc.
        });

        thread.setName("Worker-1");
        thread.start();
        thread.join();
        System.out.println("Done");
    }
}
```

**Why:** Exception handler logs errors and enables recovery; otherwise failures are silent.

**💡 Tip:** Set uncaught exception handler for threads to log and handle unexpected errors.

---

#### ❌ Wrong - Creating Threads in Tight Loop Without Cleanup:
```java
// WRONG - Thread leak
public class Main {
    static class Server {
        void handleRequest() {
            // Each request creates a new thread - no limit!
            Thread handler = new Thread(() -> {
                try {
                    Thread.sleep(10000);  // Simulate long processing
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
            handler.start();
            // No tracking, no cleanup - thread leak!
        }
    }

    public static void main(String[] args) {
        Server server = new Server();
        for (int i = 0; i < 10000; i++) {
            server.handleRequest();  // 10,000 threads created!
        }
        // System runs out of memory or thread limit
    }
}
```
**Issue:** Creating unbounded threads without tracking or cleanup causes resource exhaustion

#### ✅ Right:
```java
// CORRECT - Use thread pool with limits
import java.util.concurrent.*;

public class Main {
    static class Server {
        private final ExecutorService executor =
            Executors.newFixedThreadPool(10);  // Max 10 concurrent threads

        void handleRequest() {
            executor.submit(() -> {
                try {
                    Thread.sleep(10000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }

        void shutdown() {
            executor.shutdown();  // Clean shutdown
            try {
                executor.awaitTermination(60, TimeUnit.SECONDS);
            } catch (InterruptedException e) {
                executor.shutdownNow();
            }
        }
    }

    public static void main(String[] args) {
        Server server = new Server();
        for (int i = 0; i < 10000; i++) {
            server.handleRequest();  // Queued, max 10 threads executing
        }
        server.shutdown();
    }
}
```

**Why:** Thread pools limit concurrent threads and reuse threads; prevents resource exhaustion.

**💡 Tip:** Use ExecutorService thread pools instead of creating unbounded threads.

---

#### ❌ Wrong - Not Waiting for Threads to Complete:
```java
// WRONG - Main exits without waiting for threads
public class Main {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            try {
                Thread.sleep(2000);
                System.out.println("Thread 1 done");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        Thread thread2 = new Thread(() -> {
            try {
                Thread.sleep(3000);
                System.out.println("Thread 2 done");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        thread1.start();
        thread2.start();

        System.out.println("Main ending");
        // Main ends, but JVM waits for non-daemon threads
        // If threads were daemon, they'd be terminated abruptly
    }
}
```
**Issue:** Not waiting for threads can cause premature shutdown or race conditions

#### ✅ Right:
```java
// CORRECT - Wait for threads with join()
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            try {
                Thread.sleep(2000);
                System.out.println("Thread 1 done");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        Thread thread2 = new Thread(() -> {
            try {
                Thread.sleep(3000);
                System.out.println("Thread 2 done");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        thread1.start();
        thread2.start();

        // Wait for both threads to complete
        thread1.join();
        thread2.join();

        System.out.println("All threads completed");
        System.out.println("Main ending");
    }
}
```

**Why:** join() ensures all work completes before exiting; prevents data loss.

**💡 Tip:** Call join() on all non-daemon threads before exiting main to ensure completion.

---

### 10. Resource Management and Performance Mistakes

#### ❌ Wrong - Sharing Mutable State Without Synchronization:
```java
// WRONG - Race condition on shared variable
public class Main {
    static int counter = 0;  // Shared mutable state

    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                counter++;  // Not thread-safe!
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                counter++;  // Not thread-safe!
            }
        });

        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();

        System.out.println("Counter: " + counter);  // Not 20000! Lost updates
    }
}
```
**Issue:** Multiple threads modifying shared variable without synchronization causes race conditions

#### ✅ Right:
```java
// CORRECT - Synchronize shared mutable state
public class Main {
    static int counter = 0;
    static final Object lock = new Object();

    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                synchronized (lock) {
                    counter++;  // Thread-safe
                }
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                synchronized (lock) {
                    counter++;  // Thread-safe
                }
            }
        });

        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();

        System.out.println("Counter: " + counter);  // 20000 - correct!

        // Or use AtomicInteger (covered in Day 26)
    }
}
```

**Why:** Synchronized access ensures thread-safe updates; prevents race conditions.

**💡 Tip:** Always synchronize access to shared mutable state (covered in detail Day 26).

---

#### ❌ Wrong - Busy Waiting:
```java
// WRONG - Busy waiting wastes CPU
public class Main {
    static volatile boolean ready = false;

    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            // Busy waiting - constantly checks flag
            while (!ready) {
                // Wastes CPU cycles!
            }
            System.out.println("Starting work");
        });

        worker.start();
        Thread.sleep(2000);
        ready = true;

        worker.join();
    }
}
```
**Issue:** Busy waiting (polling) wastes CPU cycles; inefficient

#### ✅ Right:
```java
// CORRECT - Use wait/notify for efficient waiting
public class Main {
    static boolean ready = false;
    static final Object lock = new Object();

    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            synchronized (lock) {
                while (!ready) {
                    try {
                        lock.wait();  // Efficient waiting
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
            System.out.println("Starting work");
        });

        worker.start();
        Thread.sleep(2000);

        synchronized (lock) {
            ready = true;
            lock.notify();  // Wake up worker
        }

        worker.join();
    }
}
```

**Why:** wait/notify is efficient; busy waiting wastes CPU.

**💡 Tip:** Use wait/notify or blocking queues instead of busy waiting (Day 26).

---

#### ❌ Wrong - Not Considering Thread Overhead:
```java
// WRONG - Creating thread for trivial task
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            System.out.println("Hello");  // Trivial task
        });

        thread.start();
        thread.join();

        // Thread creation overhead > task execution time!
    }
}
```
**Issue:** Thread creation has overhead; not worth it for trivial tasks

#### ✅ Right:
```java
// CORRECT - Use threads for substantial work only
public class Main {
    public static void main(String[] args) {
        // For trivial task: just execute directly
        System.out.println("Hello");  // No thread needed

        // Use threads for:
        // - Long-running operations
        // - I/O-bound tasks
        // - CPU-intensive computations
        // - Tasks that can run concurrently

        Thread thread = new Thread(() -> {
            // Substantial work
            for (int i = 0; i < 1000000; i++) {
                Math.sqrt(i);  // CPU-intensive task
            }
        });

        thread.start();
    }
}
```

**Why:** Thread overhead (creation, context switching) only worthwhile for substantial work.

**💡 Tip:** Use threads for long-running or I/O tasks; not for trivial operations.

---

#### ❌ Wrong - Not Closing Resources in Threads:
```java
// WRONG - Resource leak in thread
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            try {
                FileWriter writer = new FileWriter("output.txt");
                writer.write("Hello");
                // Forgot to close! Resource leak
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        thread.start();
    }
}
```
**Issue:** Not closing resources in threads causes leaks; especially problematic with many threads

#### ✅ Right:
```java
// CORRECT - Always close resources
import java.io.*;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            // Use try-with-resources
            try (FileWriter writer = new FileWriter("output.txt")) {
                writer.write("Hello");
                writer.flush();
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        thread.start();
        thread.join();
    }
}
```

**Why:** Try-with-resources ensures resources are closed even if exception occurs.

**💡 Tip:** Always use try-with-resources for resource management in threads.

---

This comprehensive list contains **40+ Multithreading Basics mistakes** covering all fundamental concepts!

---

**🎉 Congratulations on completing Day 25!**

You've learned the fundamentals of multithreading in Java. Tomorrow, we'll explore thread synchronization and handling shared resources.

**Next**: [Day 26: Thread Synchronization →](day26_thread_synchronization.md)

---

## 🧭 Navigation

### Week 4 Progress:
- [Day 22: File I/O Basics](day22_file_io.md)
- [Day 23: File Operations & NIO](day23_file_operations.md)
- [Day 24: Serialization](day24_serialization.md)
- **Day 25: Multithreading Basics** ← You are here
- [Day 26: Thread Synchronization](day26_thread_synchronization.md)
- [Day 27: Lambda Expressions](day27_lambda_expressions.md)
- [Day 28: Stream API](day28_stream_api.md)
- [Day 29: Date & Time API](day29_date_time_api.md)
- [Day 30: Final Review & Project](day30_final_review.md)

### Related Resources:
- [📝 Day 25 Assessment](../../../java-learning-app/src/data/assessments/java/week4/day25.js)
- [🏠 Back to Week 4 Overview](README.md)
- [📖 Course Overview](../../Java_Core_Fundamentals_30Day_Course.md)

---

## ✅ Day 25 Checklist

Before moving to Day 26, ensure you can:
- [ ] Explain what threads are and their benefits
- [ ] Create threads using Thread class
- [ ] Create threads using Runnable interface
- [ ] Understand thread lifecycle and states
- [ ] Use sleep() method correctly
- [ ] Use join() method to wait for threads
- [ ] Set and understand thread priorities
- [ ] Create and use daemon threads
- [ ] Handle InterruptedException
- [ ] Get thread information (name, ID, state)

---

**🎉 Congratulations on completing Day 25!**

You've learned the fundamentals of multithreading in Java. Tomorrow, we'll explore thread synchronization and handling shared resources.

**Next**: [Day 26: Thread Synchronization →](day26_thread_synchronization.md)

---

*Last Updated: 2026-01-09*