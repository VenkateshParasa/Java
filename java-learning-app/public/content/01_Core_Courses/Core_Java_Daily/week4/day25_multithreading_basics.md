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

---

### Exercise 2: Thread with Runnable
Create a Runnable class that prints even numbers.

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

---

### Exercise 3: Thread Join
Create threads that must complete in sequence.

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

---

### Exercise 4: Thread Priority
Create threads with different priorities.

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

---

### Exercise 5: Daemon Thread
Create a daemon thread for background monitoring.

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

---

### Exercise 6: Thread States
Demonstrate different thread states.

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

---

### Exercise 7: Multiple Worker Threads
Create multiple worker threads for parallel processing.

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

---

### Exercise 8: Thread Interruption
Handle thread interruption gracefully.

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

---

### Exercise 9: Thread Name and ID
Display thread information.

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

---

### Exercise 10: Download Simulator
Simulate multiple file downloads using threads.

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