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