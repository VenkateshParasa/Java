# Week 5: Advanced Java Topics
## Days 29-30: Multithreading & Advanced OOP Features

---

**Week Overview:**
This final week of Java Core covers advanced topics that are essential for professional Java development:
- **Day 29:** Multithreading Basics - Creating and managing threads, thread lifecycle, synchronization
- **Day 30:** Inner Classes & Enums - Advanced OOP features for better code organization

**Learning Objectives:**
By the end of this week, you will be able to:
- Create and manage threads in Java
- Understand thread lifecycle and states
- Implement thread synchronization to prevent race conditions
- Use different types of inner classes effectively
- Create and use enumerations (enums)
- Apply advanced OOP concepts in real-world scenarios

**Prerequisites:**
- Solid understanding of OOP concepts (Classes, Objects, Inheritance, Polymorphism)
- Familiarity with Java collections and exception handling
- Understanding of lambda expressions and functional interfaces (from Day 26)

---

### Day 29: Multithreading Basics

---

#### Exercise 1: Thread Creation and Execution (20 minutes)

**What you'll learn:** Creating and starting threads in Java

**Create class: `ThreadCreationDemo`**

**Concept:** **Multithreading** allows concurrent execution of two or more parts of a program. Java provides two ways to create threads:
1. Extending Thread class
2. Implementing Runnable interface (preferred)

```
Why Multithreading?
- Better CPU utilization
- Responsive UI
- Parallel task execution
- Background operations

Thread vs Process:
- Process: Complete program
- Thread: Lightweight subprocess within program
```

**Step-by-Step:**

```java
// Method 1: Extending Thread class
class MyThread extends Thread {
    private String threadName;

    MyThread(String name) {
        this.threadName = name;
    }

    @Override
    public void run() {
        System.out.println(threadName + " starting...");

        for (int i = 1; i <= 5; i++) {
            System.out.println(threadName + ": " + i);
            try {
                Thread.sleep(500); // Sleep 500ms
            } catch (InterruptedException e) {
                System.out.println(threadName + " interrupted");
            }
        }

        System.out.println(threadName + " finished!");
    }
}

// Method 2: Implementing Runnable interface (PREFERRED)
class MyRunnable implements Runnable {
    private String threadName;

    MyRunnable(String name) {
        this.threadName = name;
    }

    @Override
    public void run() {
        System.out.println(threadName + " starting...");

        for (int i = 1; i <= 5; i++) {
            System.out.println(threadName + ": " + i);
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                System.out.println(threadName + " interrupted");
            }
        }

        System.out.println(threadName + " finished!");
    }
}

public class ThreadCreationDemo {
    public static void main(String[] args) {
        System.out.println("===== THREAD CREATION =====\n");
        System.out.println("Main thread: " + Thread.currentThread().getName());

        // Method 1: Using Thread class
        System.out.println("\n--- Method 1: Thread Class ---");
        MyThread thread1 = new MyThread("Thread-A");
        MyThread thread2 = new MyThread("Thread-B");

        thread1.start(); // Start thread (calls run internally)
        thread2.start();

        try {
            thread1.join(); // Wait for thread1 to finish
            thread2.join(); // Wait for thread2 to finish
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Method 2: Using Runnable interface
        System.out.println("\n--- Method 2: Runnable Interface ---");
        MyRunnable runnable1 = new MyRunnable("Runnable-X");
        MyRunnable runnable2 = new MyRunnable("Runnable-Y");

        Thread thread3 = new Thread(runnable1);
        Thread thread4 = new Thread(runnable2);

        thread3.start();
        thread4.start();

        try {
            thread3.join();
            thread4.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Method 3: Using Lambda (Java 8+)
        System.out.println("\n--- Method 3: Lambda Expression ---");

        Thread thread5 = new Thread(() -> {
            System.out.println("Lambda thread starting...");
            for (int i = 1; i <= 3; i++) {
                System.out.println("Lambda: " + i);
                try {
                    Thread.sleep(300);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println("Lambda thread finished!");
        });

        thread5.start();

        try {
            thread5.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Method 4: Anonymous class
        System.out.println("\n--- Method 4: Anonymous Class ---");

        Thread thread6 = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("Anonymous thread starting...");
                for (int i = 1; i <= 3; i++) {
                    System.out.println("Anonymous: " + i);
                    try {
                        Thread.sleep(300);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                System.out.println("Anonymous thread finished!");
            }
        });

        thread6.start();

        try {
            thread6.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\n===========================");
        System.out.println("All threads completed!");
    }
}
```

**Expected Output:**
```
===== THREAD CREATION =====

Main thread: main

--- Method 1: Thread Class ---
Thread-A starting...
Thread-B starting...
Thread-A: 1
Thread-B: 1
Thread-A: 2
Thread-B: 2
Thread-A: 3
Thread-B: 3
Thread-A: 4
Thread-B: 4
Thread-A: 5
Thread-B: 5
Thread-A finished!
Thread-B finished!

--- Method 2: Runnable Interface ---
Runnable-X starting...
Runnable-Y starting...
Runnable-X: 1
Runnable-Y: 1
Runnable-X: 2
Runnable-Y: 2
Runnable-X: 3
Runnable-Y: 3
Runnable-X: 4
Runnable-Y: 4
Runnable-X: 5
Runnable-Y: 5
Runnable-X finished!
Runnable-Y finished!

--- Method 3: Lambda Expression ---
Lambda thread starting...
Lambda: 1
Lambda: 2
Lambda: 3
Lambda thread finished!

--- Method 4: Anonymous Class ---
Anonymous thread starting...
Anonymous: 1
Anonymous: 2
Anonymous: 3
Anonymous thread finished!

===========================
All threads completed!
```

**💡 Thread Creation Methods:**

```java
// Method 1: Extend Thread (NOT recommended)
class MyThread extends Thread {
    public void run() {
        // Thread code
    }
}
MyThread t = new MyThread();
t.start();

// Method 2: Implement Runnable (RECOMMENDED)
class MyRunnable implements Runnable {
    public void run() {
        // Thread code
    }
}
Thread t = new Thread(new MyRunnable());
t.start();

// Method 3: Lambda (BEST for simple tasks)
Thread t = new Thread(() -> {
    // Thread code
});
t.start();

// Method 4: Anonymous class
Thread t = new Thread(new Runnable() {
    public void run() {
        // Thread code
    }
});
t.start();
```

**Important Methods:**

| Method | Description |
|--------|-------------|
| `start()` | Starts thread execution |
| `run()` | Contains thread logic (don't call directly!) |
| `join()` | Wait for thread to finish |
| `sleep(ms)` | Pause thread for milliseconds |
| `getName()` | Get thread name |
| `setName()` | Set thread name |

**✅ Success Criteria:**
- Can create threads using both methods
- Understand start() vs run()
- Know how to use join()
- Can implement with lambda
- Understand thread lifecycle basics

**Common Mistakes:**

1. ❌ **Calling `run()` directly instead of `start()`**: This is the most common beginner mistake. When you call `run()` directly, it executes in the current thread, not in a new thread.
   - Why: `run()` is just a regular method. Only `start()` creates a new thread and then calls `run()` in that thread.
   - Fix: Always use `thread.start()` to create a new thread. Never call `thread.run()` directly.
   - Example:
   ```java
   Thread t = new Thread(() -> System.out.println("Hello"));
   t.run();  // ❌ Wrong - runs in current thread
   t.start(); // ✅ Correct - creates new thread
   ```

2. ❌ **Not handling InterruptedException properly**: Many beginners either ignore the exception or handle it incorrectly.
   - Why: `InterruptedException` is a checked exception that must be handled when calling `sleep()`, `join()`, or `wait()`.
   - Fix: Always wrap thread sleep/wait in try-catch or declare throws InterruptedException.
   - Example:
   ```java
   // ❌ Wrong - won't compile
   Thread.sleep(1000);

   // ✅ Correct
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       Thread.currentThread().interrupt(); // Restore interrupt status
   }
   ```

3. ❌ **Extending Thread class unnecessarily**: Using inheritance when composition would be better.
   - Why: Java only allows single inheritance. If you extend Thread, you can't extend any other class. Also, you're creating a specialized thread rather than giving a thread something to run.
   - Fix: Implement Runnable interface instead (or use lambda expressions).
   - Example:
   ```java
   // ❌ Wrong - wastes inheritance
   class MyTask extends Thread {
       public void run() { /* work */ }
   }

   // ✅ Correct - uses composition
   class MyTask implements Runnable {
       public void run() { /* work */ }
   }
   Thread t = new Thread(new MyTask());
   ```

4. ❌ **Forgetting to use join() when waiting for threads**: Main thread exits before worker threads complete.
   - Why: If main thread finishes while worker threads are running, the JVM may terminate before workers complete their tasks.
   - Fix: Use `thread.join()` to wait for threads to complete when their results matter.
   - Example:
   ```java
   Thread t1 = new Thread(() -> processData());
   t1.start();
   // ❌ Wrong - main may exit before t1 finishes
   System.out.println("Done");

   // ✅ Correct - wait for completion
   t1.start();
   t1.join();
   System.out.println("Done");
   ```

5. ❌ **Starting the same thread twice**: Attempting to call `start()` multiple times on the same thread instance.
   - Why: A thread can only be started once. Calling `start()` again throws IllegalThreadStateException.
   - Fix: Create a new thread instance if you need to run the task again.
   - Example:
   ```java
   Thread t = new Thread(() -> System.out.println("Task"));
   t.start();
   t.start(); // ❌ Throws IllegalThreadStateException

   // ✅ Correct - create new thread
   Thread t2 = new Thread(() -> System.out.println("Task"));
   t2.start();
   ```

**🎯 Challenge:**
1. Create 5 threads that count simultaneously
2. Implement thread that downloads data (simulated)
3. Create producer thread and consumer thread
4. Build simple timer using thread
5. Implement thread pool manually

---

#### Exercise 2: Thread Lifecycle and States (20 minutes)

**What you'll learn:** Understanding thread lifecycle and states

**Create class: `ThreadLifecycleDemo`**

**Concept:** **Thread Lifecycle** - A thread goes through various states from creation to termination:

```
NEW → RUNNABLE → RUNNING → TERMINATED
         ↕           ↕
      WAITING    TIMED_WAITING
         ↕
      BLOCKED

States:
1. NEW: Created but not started
2. RUNNABLE: Ready to run
3. RUNNING: Executing
4. WAITING: Waiting indefinitely
5. TIMED_WAITING: Waiting for specified time
6. BLOCKED: Waiting for lock
7. TERMINATED: Finished execution
```

**Step-by-Step:**

```java
class LifecycleThread extends Thread {
    private String threadName;

    LifecycleThread(String name) {
        this.threadName = name;
        System.out.println(threadName + " created (NEW state)");
    }

    @Override
    public void run() {
        System.out.println(threadName + " now RUNNING");

        try {
            // Simulate some work
            for (int i = 1; i <= 3; i++) {
                System.out.println(threadName + " working... " + i);
                Thread.sleep(1000); // TIMED_WAITING state
            }

            // Demonstrate waiting
            synchronized (this) {
                System.out.println(threadName + " waiting...");
                wait(2000); // WAITING state (with timeout = TIMED_WAITING)
            }

        } catch (InterruptedException e) {
            System.out.println(threadName + " interrupted");
        }

        System.out.println(threadName + " finishing (will be TERMINATED)");
    }
}

public class ThreadLifecycleDemo {

    public static void printThreadState(Thread thread, String label) {
        System.out.println(label + " - State: " + thread.getState());
    }

    public static void main(String[] args) {
        System.out.println("===== THREAD LIFECYCLE =====\n");

        // Create thread (NEW state)
        LifecycleThread thread = new LifecycleThread("Worker");
        printThreadState(thread, "After creation");

        // Start thread (RUNNABLE state)
        thread.start();
        printThreadState(thread, "After start()");

        // Check state while running
        try {
            Thread.sleep(500);
            printThreadState(thread, "While running");

            Thread.sleep(1500);
            printThreadState(thread, "During sleep");

            // Wait for thread to finish
            thread.join();
            printThreadState(thread, "After completion");

        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Demonstrate all states
        System.out.println("\n--- Demonstrating All States ---");

        // State: NEW
        Thread t1 = new Thread(() -> {
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {}
        });
        System.out.println("Thread t1: " + t1.getState()); // NEW

        // State: RUNNABLE
        t1.start();
        System.out.println("Thread t1: " + t1.getState()); // RUNNABLE

        // State: TIMED_WAITING
        try {
            Thread.sleep(100);
            System.out.println("Thread t1: " + t1.getState()); // TIMED_WAITING

            // State: TERMINATED
            t1.join();
            System.out.println("Thread t1: " + t1.getState()); // TERMINATED

        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Demonstrate BLOCKED state
        System.out.println("\n--- Demonstrating BLOCKED State ---");

        Object lock = new Object();

        Thread t2 = new Thread(() -> {
            synchronized (lock) {
                System.out.println("t2 acquired lock");
                try {
                    Thread.sleep(3000);
                } catch (InterruptedException e) {}
                System.out.println("t2 releasing lock");
            }
        });

        Thread t3 = new Thread(() -> {
            System.out.println("t3 trying to acquire lock");
            synchronized (lock) {
                System.out.println("t3 acquired lock");
            }
        });

        t2.start();

        try {
            Thread.sleep(500); // Let t2 acquire lock first
        } catch (InterruptedException e) {}

        t3.start();

        try {
            Thread.sleep(500); // Let t3 try to acquire lock
            System.out.println("Thread t3: " + t3.getState()); // BLOCKED

            t2.join();
            t3.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Thread information
        System.out.println("\n--- Thread Information ---");
        Thread mainThread = Thread.currentThread();
        System.out.println("Name: " + mainThread.getName());
        System.out.println("Priority: " + mainThread.getPriority());
        System.out.println("State: " + mainThread.getState());
        System.out.println("Is Alive: " + mainThread.isAlive());
        System.out.println("Is Daemon: " + mainThread.isDaemon());

        System.out.println("\n============================");
    }
}
```

**Expected Output:**
```
===== THREAD LIFECYCLE =====

Worker created (NEW state)
After creation - State: NEW
Worker now RUNNING
After start() - State: RUNNABLE
Worker working... 1
While running - State: TIMED_WAITING
Worker working... 2
During sleep - State: TIMED_WAITING
Worker working... 3
Worker waiting...
Worker finishing (will be TERMINATED)
After completion - State: TERMINATED

--- Demonstrating All States ---
Thread t1: NEW
Thread t1: RUNNABLE
Thread t1: TIMED_WAITING
Thread t1: TERMINATED

--- Demonstrating BLOCKED State ---
t2 acquired lock
t3 trying to acquire lock
Thread t3: BLOCKED
t2 releasing lock
t3 acquired lock

--- Thread Information ---
Name: main
Priority: 5
State: RUNNABLE
Is Alive: true
Is Daemon: false

============================
```

**💡 Thread States:**

```java
// Get thread state
Thread.State state = thread.getState();

// States:
NEW            // Created, not started
RUNNABLE       // Executing or ready to execute
TIMED_WAITING  // Waiting for specified time
WAITING        // Waiting indefinitely
BLOCKED        // Waiting for monitor lock
TERMINATED     // Completed execution

// Methods that change state:
start()        // NEW → RUNNABLE
sleep()        // RUNNING → TIMED_WAITING
wait()         // RUNNING → WAITING/TIMED_WAITING
notify()       // WAITING → RUNNABLE
join()         // Wait for another thread
// Finish run() → TERMINATED
```

**✅ Success Criteria:**
- Understand all thread states
- Can check thread state with getState()
- Know methods that transition between states
- Understand blocked vs waiting
- Can get thread information

**Common Mistakes:**

1. ❌ **Assuming thread states change instantly**: Developers often check thread state immediately after calling `start()` and expect it to be RUNNING.
   - Why: State transitions are asynchronous. After calling `start()`, the thread is RUNNABLE, not necessarily RUNNING yet. The thread scheduler decides when it actually runs.
   - Fix: Understand that getState() returns a snapshot. States can change between calls. Don't make decisions based on immediate state checks.
   - Example:
   ```java
   Thread t = new Thread(() -> { /* work */ });
   t.start();
   System.out.println(t.getState()); // Likely RUNNABLE, not guaranteed to be RUNNING

   // Thread states are not guaranteed to transition in specific timing
   Thread.sleep(100); // Give scheduler time
   System.out.println(t.getState()); // Now might be TIMED_WAITING, TERMINATED, etc.
   ```

2. ❌ **Not properly waiting for thread completion**: Using `isAlive()` in a busy-wait loop instead of `join()`.
   - Why: Busy-waiting wastes CPU cycles and is inefficient. The `join()` method is designed specifically for waiting.
   - Fix: Use `thread.join()` to wait for thread completion instead of polling with `isAlive()`.
   - Example:
   ```java
   // ❌ Wrong - busy waiting
   Thread t = new Thread(() -> processData());
   t.start();
   while (t.isAlive()) {
       // Wastes CPU cycles
   }

   // ✅ Correct - use join
   t.start();
   t.join(); // Waits efficiently
   ```

3. ❌ **Confusing BLOCKED and WAITING states**: Thinking they're the same thing.
   - Why: BLOCKED means waiting for a monitor lock (synchronized). WAITING/TIMED_WAITING means explicitly waiting via `wait()`, `sleep()`, or `join()`.
   - Fix: Understand the difference - BLOCKED is involuntary (waiting for lock), WAITING is voluntary (called wait/sleep).
   - Example:
   ```java
   // BLOCKED state - waiting for synchronized lock
   synchronized(lock) {
       // If another thread holds lock, this thread is BLOCKED
   }

   // WAITING state - explicitly waiting
   synchronized(lock) {
       lock.wait(); // Now in WAITING state
   }

   // TIMED_WAITING - waiting with timeout
   Thread.sleep(1000); // Thread is TIMED_WAITING
   ```

4. ❌ **Checking thread state for control flow**: Using getState() to make program decisions.
   - Why: Thread states are snapshots and can change immediately after checking. Race conditions can occur.
   - Fix: Use proper synchronization mechanisms (locks, wait/notify) rather than polling thread states.
   - Example:
   ```java
   // ❌ Wrong - race condition
   if (thread.getState() == Thread.State.WAITING) {
       // State might have changed by now!
       thread.interrupt();
   }

   // ✅ Correct - use proper synchronization
   synchronized(lock) {
       // Coordinate with wait/notify
       lock.notify();
   }
   ```

5. ❌ **Not handling thread interruption during state transitions**: Ignoring InterruptedException.
   - Why: When a thread is interrupted while in WAITING or TIMED_WAITING state, it throws InterruptedException. Ignoring it can cause threads to not respond to cancellation.
   - Fix: Always handle InterruptedException and decide whether to restore interrupt status or exit gracefully.
   - Example:
   ```java
   // ❌ Wrong - swallows interruption
   try {
       Thread.sleep(5000);
   } catch (InterruptedException e) {
       // Empty catch - bad!
   }

   // ✅ Correct - handle properly
   try {
       Thread.sleep(5000);
   } catch (InterruptedException e) {
       Thread.currentThread().interrupt(); // Restore status
       return; // Exit cleanly
   }
   ```

**🎯 Challenge:**
1. Create thread state visualizer
2. Implement thread monitor that logs state changes
3. Build thread lifecycle diagram generator
4. Create thread pool with state tracking

---

#### Exercise 3: Thread Methods and Control (20 minutes)

**What you'll learn:** Using thread control methods

**Create class: `ThreadMethodsDemo`**

**Concept:** Java provides various methods to control thread execution:
- Priority management
- Daemon threads
- Thread interruption
- Thread naming

**Step-by-Step:**

```java
public class ThreadMethodsDemo {

    // Demonstrate thread priority
    static class PriorityThread extends Thread {
        public PriorityThread(String name, int priority) {
            setName(name);
            setPriority(priority);
        }

        @Override
        public void run() {
            for (int i = 1; i <= 5; i++) {
                System.out.println(getName() + " (Priority " + getPriority() + "): " + i);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    System.out.println(getName() + " interrupted");
                }
            }
        }
    }

    // Demonstrate daemon thread
    static class DaemonThread extends Thread {
        public DaemonThread() {
            setDaemon(true); // Must be called before start()
        }

        @Override
        public void run() {
            while (true) {
                System.out.println("Daemon thread running...");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    break;
                }
            }
            System.out.println("Daemon thread ending");
        }
    }

    // Demonstrate thread interruption
    static class InterruptibleThread extends Thread {
        @Override
        public void run() {
            try {
                System.out.println("Thread starting long operation...");
                for (int i = 1; i <= 10; i++) {
                    if (Thread.interrupted()) {
                        System.out.println("Thread was interrupted!");
                        return;
                    }
                    System.out.println("Working... " + i);
                    Thread.sleep(500);
                }
                System.out.println("Thread completed normally");
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted during sleep!");
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("===== THREAD METHODS =====\n");

        // Part 1: Thread Priority
        System.out.println("--- Part 1: Thread Priority ---");
        System.out.println("MIN_PRIORITY: " + Thread.MIN_PRIORITY);
        System.out.println("NORM_PRIORITY: " + Thread.NORM_PRIORITY);
        System.out.println("MAX_PRIORITY: " + Thread.MAX_PRIORITY);

        PriorityThread highPriority = new PriorityThread("High", Thread.MAX_PRIORITY);
        PriorityThread lowPriority = new PriorityThread("Low", Thread.MIN_PRIORITY);
        PriorityThread normalPriority = new PriorityThread("Normal", Thread.NORM_PRIORITY);

        highPriority.start();
        normalPriority.start();
        lowPriority.start();

        try {
            highPriority.join();
            normalPriority.join();
            lowPriority.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Part 2: Daemon Threads
        System.out.println("\n--- Part 2: Daemon Threads ---");

        DaemonThread daemon = new DaemonThread();
        daemon.start();

        System.out.println("Is daemon: " + daemon.isDaemon());

        try {
            Thread.sleep(3500); // Let daemon run for 3.5 seconds
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Main thread ending (daemon will die too)");

        // Part 3: Thread Interruption
        System.out.println("\n--- Part 3: Thread Interruption ---");

        InterruptibleThread worker = new InterruptibleThread();
        worker.start();

        try {
            Thread.sleep(2000); // Let it work for 2 seconds
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Main: Interrupting worker thread");
        worker.interrupt();

        try {
            worker.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Part 4: Thread Information
        System.out.println("\n--- Part 4: Thread Information ---");

        Thread current = Thread.currentThread();

        System.out.println("Current thread info:");
        System.out.println("  Name: " + current.getName());
        System.out.println("  Priority: " + current.getPriority());
        System.out.println("  State: " + current.getState());
        System.out.println("  Is Daemon: " + current.isDaemon());
        System.out.println("  Is Alive: " + current.isAlive());
        System.out.println("  Thread Group: " + current.getThreadGroup().getName());

        // Part 5: Thread Sleep
        System.out.println("\n--- Part 5: Thread Sleep ---");

        System.out.println("Sleeping for 2 seconds...");
        long startTime = System.currentTimeMillis();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        long endTime = System.currentTimeMillis();
        System.out.println("Slept for: " + (endTime - startTime) + "ms");

        // Part 6: Thread Yield (hint to scheduler)
        System.out.println("\n--- Part 6: Thread Yield ---");

        Thread yielder1 = new Thread(() -> {
            for (int i = 0; i < 3; i++) {
                System.out.println("Yielder1: " + i);
                Thread.yield(); // Hint to give other threads a chance
            }
        });

        Thread yielder2 = new Thread(() -> {
            for (int i = 0; i < 3; i++) {
                System.out.println("Yielder2: " + i);
                Thread.yield();
            }
        });

        yielder1.start();
        yielder2.start();

        try {
            yielder1.join();
            yielder2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\n==========================");
    }
}
```

**Expected Output:**
```
===== THREAD METHODS =====

--- Part 1: Thread Priority ---
MIN_PRIORITY: 1
NORM_PRIORITY: 5
MAX_PRIORITY: 10
High (Priority 10): 1
Normal (Priority 5): 1
Low (Priority 1): 1
High (Priority 10): 2
Normal (Priority 5): 2
Low (Priority 1): 2
...

--- Part 2: Daemon Threads ---
Is daemon: true
Daemon thread running...
Daemon thread running...
Daemon thread running...
Main thread ending (daemon will die too)

--- Part 3: Thread Interruption ---
Thread starting long operation...
Working... 1
Working... 2
Working... 3
Working... 4
Main: Interrupting worker thread
Thread was interrupted!

--- Part 4: Thread Information ---
Current thread info:
  Name: main
  Priority: 5
  State: RUNNABLE
  Is Daemon: false
  Is Alive: true
  Thread Group: main

--- Part 5: Thread Sleep ---
Sleeping for 2 seconds...
Slept for: 2001ms

--- Part 6: Thread Yield ---
Yielder1: 0
Yielder2: 0
Yielder1: 1
Yielder2: 1
Yielder1: 2
Yielder2: 2

==========================
```

**💡 Thread Methods:**

```java
// Priority (1-10, default 5)
thread.setPriority(Thread.MAX_PRIORITY); // 10
thread.setPriority(Thread.MIN_PRIORITY); // 1
int priority = thread.getPriority();

// Daemon (background thread)
thread.setDaemon(true); // Must call before start()
boolean isDaemon = thread.isDaemon();

// Interruption
thread.interrupt();           // Set interrupt flag
boolean isInterrupted = thread.isInterrupted();
boolean wasInterrupted = Thread.interrupted(); // Clears flag

// Sleep
Thread.sleep(milliseconds);   // Pause execution

// Yield
Thread.yield();               // Hint to scheduler

// Join
thread.join();                // Wait for thread to finish
thread.join(milliseconds);    // Wait with timeout

// Information
String name = thread.getName();
thread.setName("NewName");
Thread.State state = thread.getState();
boolean isAlive = thread.isAlive();
```

**✅ Success Criteria:**
- Understand thread priority (limited effect)
- Know what daemon threads are
- Can interrupt threads properly
- Master sleep and join
- Can get/set thread properties

**Common Mistakes:**

1. ❌ **Setting daemon status after starting thread**: Calling `setDaemon(true)` after `start()`.
   - Why: Daemon status must be set before the thread starts. Trying to change it after throws IllegalThreadStateException.
   - Fix: Always call `setDaemon()` before calling `start()`.
   - Example:
   ```java
   Thread t = new Thread(() -> System.out.println("Task"));
   t.start();
   t.setDaemon(true); // ❌ Throws IllegalThreadStateException

   // ✅ Correct
   Thread t2 = new Thread(() -> System.out.println("Task"));
   t2.setDaemon(true); // Set BEFORE start
   t2.start();
   ```

2. ❌ **Not restoring interrupt status after catching InterruptedException**: Simply catching and ignoring interruption.
   - Why: When you catch InterruptedException, the interrupt flag is cleared. If you don't restore it, higher-level code won't know the thread was interrupted.
   - Fix: Call `Thread.currentThread().interrupt()` in catch block to restore interrupt status.
   - Example:
   ```java
   // ❌ Wrong - loses interrupt status
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace(); // Interrupt flag is lost!
   }

   // ✅ Correct - restores interrupt status
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       Thread.currentThread().interrupt(); // Restore flag
       return; // Or handle appropriately
   }
   ```

3. ❌ **Relying on thread priority for correctness**: Writing code that depends on priority to work correctly.
   - Why: Thread priority is just a hint to the scheduler. It's platform-dependent and not guaranteed to affect execution order. Some systems may ignore it entirely.
   - Fix: Use priorities only as optimization hints, never for correctness. Use proper synchronization for coordination.
   - Example:
   ```java
   // ❌ Wrong - assumes priority guarantees order
   Thread high = new Thread(() -> processFirst());
   Thread low = new Thread(() -> processSecond());
   high.setPriority(Thread.MAX_PRIORITY);
   low.setPriority(Thread.MIN_PRIORITY);
   high.start();
   low.start();
   // No guarantee high runs before low!

   // ✅ Correct - use synchronization for ordering
   CountDownLatch latch = new CountDownLatch(1);
   Thread first = new Thread(() -> {
       processFirst();
       latch.countDown();
   });
   Thread second = new Thread(() -> {
       latch.await();
       processSecond();
   });
   ```

4. ❌ **Calling Thread.sleep(0)**: Using zero milliseconds sleep thinking it yields.
   - Why: `Thread.sleep(0)` does nothing useful on most platforms. If you want to yield, use `Thread.yield()` instead.
   - Fix: Use `Thread.yield()` to hint that current thread is willing to yield CPU, or use appropriate sleep duration.
   - Example:
   ```java
   // ❌ Wrong - sleep(0) is useless
   for (int i = 0; i < 1000; i++) {
       doWork();
       Thread.sleep(0); // Does nothing
   }

   // ✅ Correct - use yield or actual sleep
   for (int i = 0; i < 1000; i++) {
       doWork();
       Thread.yield(); // Hints to scheduler
   }
   ```

5. ❌ **Confusing interrupted() and isInterrupted()**: Using the wrong method to check interrupt status.
   - Why: `Thread.interrupted()` is static, checks current thread, and CLEARS the flag. `isInterrupted()` is instance method and doesn't clear flag.
   - Fix: Use `Thread.interrupted()` when you want to clear flag, `isInterrupted()` when you just want to check.
   - Example:
   ```java
   // ❌ Wrong - checks wrong thread
   Thread t = new Thread(() -> {
       while (!Thread.interrupted()) { // ✅ Correct for this thread
           work();
       }
   });
   t.start();
   t.interrupt();
   if (Thread.interrupted()) { // ❌ Wrong - checks MAIN thread
       // This won't work as expected
   }

   // ✅ Correct
   if (t.isInterrupted()) { // Check specific thread
       System.out.println("Thread was interrupted");
   }
   ```

**🎯 Challenge:**
1. Create priority-based task scheduler
2. Implement daemon thread for logging
3. Build interruptible download manager
4. Create thread pool with priority queues

---

Due to length limits, this file contains exercises 1-3 of Day 29. The complete Day 29 needs exercises 4-7 covering:
- Exercise 4: Synchronization Basics
- Exercise 5: Thread Safety
- Exercise 6: Producer-Consumer Problem
- Exercise 7: Real-World Threading Application

Would you like me to create the final part with exercises 4-7 for Day 29?
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

**Common Mistakes:**

1. ❌ **Synchronizing on null or mutable objects**: Using objects that can change or be null as locks.
   - Why: If lock object is null, you get NullPointerException. If it changes, threads synchronize on different objects, defeating the purpose.
   - Fix: Always use a dedicated, final, non-null object as lock. Never synchronize on objects you might reassign.
   - Example:
   ```java
   // ❌ Wrong - lock can be null or change
   private String lock = null;
   public void method() {
       synchronized(lock) { // NullPointerException!
           // critical section
       }
   }

   // ✅ Correct - dedicated final lock
   private final Object lock = new Object();
   public void method() {
       synchronized(lock) {
           // critical section
       }
   }
   ```

2. ❌ **Over-synchronization**: Synchronizing entire methods when only small sections need protection.
   - Why: Over-synchronization creates unnecessary bottlenecks, reducing concurrency and performance. Threads wait even when they could safely execute.
   - Fix: Synchronize only the critical section (the smallest code block that accesses shared data). Use synchronized blocks instead of methods when possible.
   - Example:
   ```java
   // ❌ Wrong - entire method synchronized
   public synchronized void processData() {
       doExpensiveCalculation(); // Doesn't need sync
       updateSharedData();        // Needs sync
       logResults();              // Doesn't need sync
   }

   // ✅ Correct - only critical section synchronized
   public void processData() {
       doExpensiveCalculation(); // No lock held
       synchronized(this) {
           updateSharedData();    // Only this needs sync
       }
       logResults();              // No lock held
   }
   ```

3. ❌ **Synchronizing on String literals or boxed primitives**: Using interned strings or cached Integer objects as locks.
   - Why: String literals are interned across the JVM. Multiple unrelated code sections could accidentally synchronize on the same string, causing unexpected blocking. Same with cached Integer objects.
   - Fix: Always use dedicated lock objects (new Object()), never strings or boxed primitives.
   - Example:
   ```java
   // ❌ Wrong - synchronized on String literal
   private static final String LOCK = "mylock"; // Interned!
   synchronized(LOCK) {
       // ANY code in JVM using "mylock" synchronizes here!
   }

   // ❌ Wrong - cached Integer
   private static final Integer LOCK = 127; // Cached from -128 to 127
   synchronized(LOCK) {
       // Other code using Integer.valueOf(127) shares this lock!
   }

   // ✅ Correct - dedicated lock object
   private static final Object LOCK = new Object();
   synchronized(LOCK) {
       // Only this code uses this lock
   }
   ```

4. ❌ **Acquiring nested locks in inconsistent order**: Taking locks in different orders in different methods (deadlock risk).
   - Why: If Thread A locks X then Y, while Thread B locks Y then X, they can deadlock. Thread A holds X waiting for Y, Thread B holds Y waiting for X.
   - Fix: Always acquire multiple locks in the same global order. Document lock ordering in comments.
   - Example:
   ```java
   // ❌ Wrong - inconsistent lock ordering
   // Thread 1:
   synchronized(lockA) {
       synchronized(lockB) { // A then B
           // work
       }
   }
   // Thread 2:
   synchronized(lockB) {
       synchronized(lockA) { // B then A - DEADLOCK RISK!
           // work
       }
   }

   // ✅ Correct - consistent ordering
   // Always lock A before B
   synchronized(lockA) {
       synchronized(lockB) {
           // work
       }
   }
   ```

5. ❌ **Forgetting to synchronize all access to shared mutable data**: Synchronizing writes but not reads.
   - Why: If you synchronize writes but not reads, reads can see partially updated or stale data. Both reads and writes must be synchronized for safety.
   - Fix: Synchronize ALL access to mutable shared data, or use volatile for simple flags, or use atomic classes.
   - Example:
   ```java
   // ❌ Wrong - read not synchronized
   private int count = 0;

   public synchronized void increment() {
       count++; // Synchronized
   }

   public int getCount() {
       return count; // NOT synchronized - can see stale value!
   }

   // ✅ Correct - both synchronized
   public synchronized void increment() {
       count++;
   }

   public synchronized int getCount() {
       return count; // Now synchronized
   }

   // ✅ Alternative - use volatile for visibility
   private volatile int count = 0; // Simple flag/counter
   ```

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

**Common Mistakes:**

1. ❌ **Using synchronized collections when concurrent collections are better**: Relying on Collections.synchronizedList() for high-concurrency scenarios.
   - Why: Synchronized collections lock the entire collection for every operation, even reads. This creates severe bottlenecks under high concurrency. Concurrent collections allow multiple threads to read/write simultaneously.
   - Fix: Use ConcurrentHashMap, CopyOnWriteArrayList, or other concurrent collections from java.util.concurrent package.
   - Example:
   ```java
   // ❌ Wrong - poor performance under load
   List<String> list = Collections.synchronizedList(new ArrayList<>());
   // Every add(), get() locks entire list

   // ✅ Correct - better concurrency
   List<String> list = new CopyOnWriteArrayList<>();
   // Reads don't block, writes create new copy

   // For maps:
   Map<String, Integer> map = new ConcurrentHashMap<>();
   // Fine-grained locking, much better performance
   ```

2. ❌ **Forgetting volatile keyword for visibility**: Using regular fields for flags checked by multiple threads.
   - Why: Without volatile, threads may cache field values in CPU registers/cache, never seeing updates from other threads. This causes infinite loops or incorrect behavior.
   - Fix: Use volatile for flags/status variables accessed by multiple threads, or synchronize all accesses.
   - Example:
   ```java
   // ❌ Wrong - thread may never see change
   private boolean running = true;

   public void run() {
       while (running) { // May loop forever!
           doWork();
       }
   }

   public void stop() {
       running = false; // Other thread may not see this
   }

   // ✅ Correct - volatile ensures visibility
   private volatile boolean running = true;
   // Now all threads see updates immediately
   ```

3. ❌ **Creating "immutable" objects with mutable fields**: Declaring class final but having non-final fields.
   - Why: Immutability requires ALL fields to be final and properly initialized. Non-final fields can be modified after construction, breaking thread safety.
   - Fix: Make class and ALL fields final. Initialize in constructor. No setters.
   - Example:
   ```java
   // ❌ Wrong - not truly immutable
   final class Person {
       private String name;  // Not final!
       private int age;      // Not final!

       Person(String name, int age) {
           this.name = name;
           this.age = age;
       }
       // Fields can still be modified internally!
   }

   // ✅ Correct - truly immutable
   final class Person {
       private final String name;
       private final int age;

       Person(String name, int age) {
           this.name = name;
           this.age = age;
       }
       // No way to modify after construction
   }
   ```

4. ❌ **Using synchronized when atomic variables suffice**: Synchronizing simple counter increments.
   - Why: Synchronization is heavyweight and can cause contention. For simple operations like incrementing counters, atomic classes (AtomicInteger, AtomicLong) are much faster and lock-free.
   - Fix: Use AtomicInteger/AtomicLong for counters, AtomicReference for references, AtomicBoolean for flags.
   - Example:
   ```java
   // ❌ Wrong - unnecessary synchronization overhead
   private int counter = 0;

   public synchronized void increment() {
       counter++; // Locks entire method for simple increment
   }

   public synchronized int get() {
       return counter;
   }

   // ✅ Correct - lock-free atomic operations
   private AtomicInteger counter = new AtomicInteger(0);

   public void increment() {
       counter.incrementAndGet(); // No locks, much faster
   }

   public int get() {
       return counter.get();
   }
   ```

5. ❌ **Not understanding thread-local memory leaks**: Using ThreadLocal without cleaning up.
   - Why: ThreadLocal values are held by thread objects. In thread pools, threads are reused, so ThreadLocal values persist. This causes memory leaks and data bleeding between requests.
   - Fix: Always call `threadLocal.remove()` when done, especially in thread pools (like web servers).
   - Example:
   ```java
   // ❌ Wrong - memory leak in thread pool
   private static ThreadLocal<UserContext> userContext = new ThreadLocal<>();

   public void handleRequest() {
       userContext.set(new UserContext());
       processRequest();
       // Never removed! Next request in same thread sees old data
   }

   // ✅ Correct - always clean up
   private static ThreadLocal<UserContext> userContext = new ThreadLocal<>();

   public void handleRequest() {
       try {
           userContext.set(new UserContext());
           processRequest();
       } finally {
           userContext.remove(); // Always remove in finally
       }
   }
   ```

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

**Common Mistakes:**

1. ❌ **Using if instead of while for wait conditions**: Checking condition once with if instead of loop.
   - Why: Spurious wakeups can occur - thread wakes up from wait() without being notified. Also, condition might change between notification and thread waking up. If you use `if`, thread doesn't recheck condition and proceeds incorrectly.
   - Fix: ALWAYS use `while` loop to check condition before and after wait(). This is critical for correctness.
   - Example:
   ```java
   // ❌ Wrong - vulnerable to spurious wakeups
   synchronized(lock) {
       if (queue.isEmpty()) { // Only checks once!
           wait();
       }
       process(queue.remove()); // Might fail if queue still empty
   }

   // ✅ Correct - loop handles spurious wakeups
   synchronized(lock) {
       while (queue.isEmpty()) { // Rechecks after wakeup
           wait();
       }
       process(queue.remove()); // Guaranteed queue not empty
   }
   ```

2. ❌ **Forgetting to call notifyAll() after changing state**: Modifying shared state without waking waiting threads.
   - Why: If you change state (add/remove from buffer) but don't notify, threads waiting on that condition will wait forever (deadlock). They're asleep and need to be woken up.
   - Fix: Always call `notifyAll()` (or `notify()`) after changing any state that waiting threads might be interested in.
   - Example:
   ```java
   // ❌ Wrong - producer never wakes consumer
   synchronized void produce(Item item) {
       while (buffer.isFull()) {
           wait();
       }
       buffer.add(item);
       // Forgot notifyAll() - consumer waits forever!
   }

   // ✅ Correct - notify waiting consumers
   synchronized void produce(Item item) {
       while (buffer.isFull()) {
           wait();
       }
       buffer.add(item);
       notifyAll(); // Wake up waiting consumers
   }
   ```

3. ❌ **Not synchronizing wait/notify calls**: Calling wait() or notify() outside synchronized block.
   - Why: wait(), notify(), and notifyAll() MUST be called from within synchronized block on the same object. Otherwise you get IllegalMonitorStateException. The JVM enforces that you own the monitor.
   - Fix: Always call wait/notify inside synchronized block on the same lock object.
   - Example:
   ```java
   // ❌ Wrong - not synchronized
   public void consume() {
       if (buffer.isEmpty()) {
           buffer.wait(); // IllegalMonitorStateException!
       }
       buffer.notifyAll(); // IllegalMonitorStateException!
   }

   // ✅ Correct - synchronized on buffer
   public void consume() {
       synchronized(buffer) {
           while (buffer.isEmpty()) {
               buffer.wait(); // OK - we own monitor
           }
           Item item = buffer.remove();
           buffer.notifyAll(); // OK - we own monitor
       }
   }
   ```

4. ❌ **Using notify() instead of notifyAll() in complex scenarios**: Waking only one thread when multiple might be waiting.
   - Why: notify() wakes ONE random waiting thread. If you have both producers and consumers waiting, you might wake the wrong type (producer wakes producer instead of consumer). notifyAll() wakes all waiters so correct thread type can proceed.
   - Fix: Use notifyAll() unless you're certain only one type of thread waits and it's safe to wake just one. When in doubt, use notifyAll().
   - Example:
   ```java
   // ❌ Wrong - might wake wrong thread type
   synchronized void produce(Item item) {
       while (buffer.isFull()) {
           wait();
       }
       buffer.add(item);
       notify(); // Might wake another producer instead of consumer!
   }

   // ✅ Correct - wakes all waiting threads
   synchronized void produce(Item item) {
       while (buffer.isFull()) {
           wait();
       }
       buffer.add(item);
       notifyAll(); // Wakes both producers and consumers
   }
   ```

5. ❌ **Holding locks while performing slow I/O or blocking operations**: Doing expensive work inside synchronized block.
   - Why: While holding lock, no other thread can enter synchronized section. If you do slow I/O (network, disk) or sleep while holding lock, all other threads block unnecessarily. This kills concurrency.
   - Fix: Hold locks for minimum time. Do slow operations outside synchronized block. Only synchronize state access.
   - Example:
   ```java
   // ❌ Wrong - slow I/O while holding lock
   synchronized void process() {
       Item item = queue.remove(); // Quick
       writeToDatabase(item);      // SLOW - blocks all other threads!
       notifyAll();
   }

   // ✅ Correct - minimize lock hold time
   Item item;
   synchronized(this) {
       item = queue.remove(); // Quick
       notifyAll();
   }
   writeToDatabase(item); // Slow I/O outside lock
   ```

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

**Common Mistakes:**

1. ❌ **Not shutting down ExecutorService properly**: Forgetting to call shutdown() or using wrong shutdown method.
   - Why: If you don't shutdown ExecutorService, threads keep running and JVM won't exit. This causes resource leaks. Using shutdownNow() without handling interrupts can lose work.
   - Fix: Always call shutdown() when done. Use shutdown() for graceful shutdown, shutdownNow() only when you need immediate forceful termination. Use awaitTermination() to wait.
   - Example:
   ```java
   // ❌ Wrong - never shuts down
   ExecutorService executor = Executors.newFixedThreadPool(5);
   for (Task task : tasks) {
       executor.submit(task);
   }
   // JVM won't exit! Threads still running

   // ✅ Correct - proper shutdown
   ExecutorService executor = Executors.newFixedThreadPool(5);
   try {
       for (Task task : tasks) {
           executor.submit(task);
       }
   } finally {
       executor.shutdown(); // Stop accepting new tasks
       executor.awaitTermination(1, TimeUnit.MINUTES); // Wait for existing tasks
   }
   ```

2. ❌ **Ignoring ExecutionException from Future.get()**: Not handling exceptions thrown by tasks.
   - Why: When you call future.get(), exceptions thrown in the task are wrapped in ExecutionException. If you don't catch it, you lose error information and errors go unnoticed.
   - Fix: Always catch ExecutionException when calling get(). Unwrap and handle the cause appropriately.
   - Example:
   ```java
   // ❌ Wrong - exceptions lost
   Future<Result> future = executor.submit(task);
   Result result = future.get(); // If task threw exception, this propagates up

   // ✅ Correct - handle exceptions
   Future<Result> future = executor.submit(task);
   try {
       Result result = future.get();
       processResult(result);
   } catch (ExecutionException e) {
       Throwable cause = e.getCause();
       log.error("Task failed: " + cause.getMessage());
       // Handle specific exceptions from task
   } catch (InterruptedException e) {
       Thread.currentThread().interrupt();
       // Handle interruption
   }
   ```

3. ❌ **Creating too many threads**: Using unbounded thread pools or creating thread per task.
   - Why: Each thread consumes memory (stack space, typically 1MB). Creating thousands of threads causes OutOfMemoryError, context-switching overhead, and poor performance.
   - Fix: Use fixed-size thread pools sized appropriately (usually CPU cores * 2 for CPU-bound, more for I/O-bound). Never use Executors.newCachedThreadPool() without limits.
   - Example:
   ```java
   // ❌ Wrong - thread explosion
   for (int i = 0; i < 10000; i++) {
       new Thread(() -> processItem(i)).start(); // 10000 threads!
   }

   // ❌ Wrong - unbounded cached pool
   ExecutorService executor = Executors.newCachedThreadPool();
   for (int i = 0; i < 10000; i++) {
       executor.submit(() -> processItem(i)); // Could create 10000 threads
   }

   // ✅ Correct - bounded thread pool
   int poolSize = Runtime.getRuntime().availableProcessors() * 2;
   ExecutorService executor = Executors.newFixedThreadPool(poolSize);
   for (int i = 0; i < 10000; i++) {
       executor.submit(() -> processItem(i)); // Max 'poolSize' threads
   }
   ```

4. ❌ **Blocking UI thread with long-running operations**: Running downloads or processing on main/UI thread.
   - Why: If you block the UI thread, the application becomes unresponsive. Users can't interact, and it appears frozen. This is terrible UX.
   - Fix: Always run long operations (network, file I/O, heavy computation) on background threads. Update UI from results.
   - Example:
   ```java
   // ❌ Wrong - blocks UI thread
   public void onDownloadButtonClick() {
       downloadFile(); // Takes 30 seconds - UI freezes!
       updateUI();
   }

   // ✅ Correct - background thread
   public void onDownloadButtonClick() {
       executor.submit(() -> {
           try {
               downloadFile(); // Runs in background
               // Update UI on UI thread
               SwingUtilities.invokeLater(() -> updateUI());
           } catch (Exception e) {
               handleError(e);
           }
       });
   }
   ```

5. ❌ **Not handling thread pool rejection**: Submitting tasks when queue is full without rejection handler.
   - Why: When thread pool and queue are full, submit() throws RejectedExecutionException. If unhandled, tasks are silently lost or application crashes.
   - Fix: Set appropriate queue size and rejection policy. Handle RejectedExecutionException or use custom RejectedExecutionHandler.
   - Example:
   ```java
   // ❌ Wrong - no rejection handling
   ExecutorService executor = new ThreadPoolExecutor(
       2, 4, 60, TimeUnit.SECONDS, new ArrayBlockingQueue<>(10)
   );
   for (int i = 0; i < 1000; i++) {
       executor.submit(task); // RejectedExecutionException when full!
   }

   // ✅ Correct - handle rejection
   ThreadPoolExecutor executor = new ThreadPoolExecutor(
       2, 4, 60, TimeUnit.SECONDS,
       new ArrayBlockingQueue<>(10),
       new ThreadPoolExecutor.CallerRunsPolicy() // Run in caller thread when full
   );

   // Or catch exception
   try {
       executor.submit(task);
   } catch (RejectedExecutionException e) {
       log.warn("Task rejected, retrying later");
       retryLater(task);
   }
   ```

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

---


### Day 30: Inner Classes & Enums

---

#### Exercise 1: Member Inner Classes (25 minutes)

**What you'll learn:** Understanding and using member inner classes to group related functionality

**Create class: `MemberInnerClassDemo`**

**Concept:** A **member inner class** is a non-static class defined at the member level of an outer class. It has access to all members (including private) of the outer class and is used to logically group classes that are only used in one place.

```
Key Points:
- Inner class instance requires outer class instance
- Can access outer class's private members
- Outer class can access inner class's private members
- Use format: OuterClass.InnerClass for the type
- Create instance: outerObj.new InnerClass()
```

**Step-by-Step:**

```java
// Example 1: Basic inner class
class Car {
    private String model;
    private int year;

    // Member inner class
    class Engine {
        private String type;
        private int horsepower;

        Engine(String type, int horsepower) {
            this.type = type;
            this.horsepower = horsepower;
        }

        void displayInfo() {
            // Inner class can access outer class's private members
            System.out.println("Car: " + model + " (" + year + ")");
            System.out.println("Engine: " + type + ", " + horsepower + " HP");
        }

        void start() {
            System.out.println(model + "'s " + type + " engine started!");
        }
    }

    Car(String model, int year) {
        this.model = model;
        this.year = year;
    }

    void createEngine(String type, int horsepower) {
        Engine engine = new Engine(type, horsepower);
        engine.displayInfo();
        engine.start();
    }
}

// Example 2: Real-world scenario - Bank account with transactions
class BankAccount {
    private String accountNumber;
    private String holder;
    private double balance;

    // Inner class to represent transactions
    class Transaction {
        private String type;
        private double amount;
        private String date;

        Transaction(String type, double amount, String date) {
            this.type = type;
            this.amount = amount;
            this.date = date;
        }

        void execute() {
            if (type.equals("DEPOSIT")) {
                balance += amount; // Access outer class's balance
                System.out.println("Deposited: $" + amount);
            } else if (type.equals("WITHDRAW")) {
                if (balance >= amount) {
                    balance -= amount;
                    System.out.println("Withdrawn: $" + amount);
                } else {
                    System.out.println("Insufficient funds!");
                    return;
                }
            }
            System.out.println("Date: " + date);
            System.out.println("New Balance: $" + balance);
        }

        void displayReceipt() {
            System.out.println("\n--- Transaction Receipt ---");
            System.out.println("Account: " + accountNumber);
            System.out.println("Holder: " + holder);
            System.out.println("Type: " + type);
            System.out.println("Amount: $" + amount);
            System.out.println("Date: " + date);
            System.out.println("Balance: $" + balance);
            System.out.println("-------------------------\n");
        }
    }

    BankAccount(String accountNumber, String holder, double balance) {
        this.accountNumber = accountNumber;
        this.holder = holder;
        this.balance = balance;
    }

    void performTransaction(String type, double amount, String date) {
        Transaction transaction = new Transaction(type, amount, date);
        transaction.execute();
        transaction.displayReceipt();
    }

    void displayAccountInfo() {
        System.out.println("Account: " + accountNumber);
        System.out.println("Holder: " + holder);
        System.out.println("Balance: $" + balance);
    }
}

public class MemberInnerClassDemo {
    public static void main(String[] args) {
        System.out.println("===== MEMBER INNER CLASSES =====\n");

        // Example 1: Car with Engine
        System.out.println("--- Car with Inner Engine Class ---");
        Car car = new Car("Tesla Model 3", 2024);
        car.createEngine("Electric", 450);

        // Creating inner class instance from outside
        System.out.println("\n--- Creating Inner Class Externally ---");
        Car car2 = new Car("BMW M5", 2023);
        Car.Engine engine = car2.new Engine("V8", 600);
        engine.displayInfo();
        engine.start();

        // Example 2: Bank account transactions
        System.out.println("\n--- Bank Account Transactions ---");
        BankAccount account = new BankAccount("ACC001", "John Doe", 1000.0);
        account.displayAccountInfo();

        System.out.println("\n--- Performing Transactions ---");
        account.performTransaction("DEPOSIT", 500.0, "2024-01-20");
        account.performTransaction("WITHDRAW", 300.0, "2024-01-21");
        account.performTransaction("WITHDRAW", 2000.0, "2024-01-22"); // Insufficient

        // Creating transaction instance externally
        System.out.println("\n--- External Transaction Creation ---");
        BankAccount account2 = new BankAccount("ACC002", "Jane Smith", 2000.0);
        BankAccount.Transaction transaction = account2.new Transaction("DEPOSIT", 1000.0, "2024-01-23");
        transaction.execute();
        transaction.displayReceipt();

        System.out.println("==============================");
    }
}
```

**Expected Output:**
```
===== MEMBER INNER CLASSES =====

--- Car with Inner Engine Class ---
Car: Tesla Model 3 (2024)
Engine: Electric, 450 HP
Tesla Model 3's Electric engine started!

--- Creating Inner Class Externally ---
Car: BMW M5 (2023)
Engine: V8, 600 HP
BMW M5's V8 engine started!

--- Bank Account Transactions ---
Account: ACC001
Holder: John Doe
Balance: $1000.0

--- Performing Transactions ---
Deposited: $500.0
Date: 2024-01-20
New Balance: $1500.0

--- Transaction Receipt ---
Account: ACC001
Holder: John Doe
Type: DEPOSIT
Amount: $500.0
Date: 2024-01-20
Balance: $1500.0
-------------------------

Withdrawn: $300.0
Date: 2024-01-21
New Balance: $1200.0

--- Transaction Receipt ---
Account: ACC001
Holder: John Doe
Type: WITHDRAW
Amount: $300.0
Date: 2024-01-21
Balance: $1200.0
-------------------------

Insufficient funds!

--- External Transaction Creation ---
Deposited: $1000.0
Date: 2024-01-23
New Balance: $3000.0

--- Transaction Receipt ---
Account: ACC002
Holder: Jane Smith
Type: DEPOSIT
Amount: $1000.0
Date: 2024-01-23
Balance: $3000.0
-------------------------

==============================
```

**✅ Success Criteria:**
- [ ] Inner classes access outer class private members
- [ ] Inner class instances created correctly (outerObj.new InnerClass())
- [ ] Transaction logic updates outer class balance
- [ ] All output matches expected format
- [ ] Insufficient funds case handled properly

**Common Mistakes:**

1. ❌ **Creating inner class instance incorrectly**: Using `new InnerClass()` instead of `outerObj.new InnerClass()`.
   - Why: Inner classes (non-static) require an outer class instance to exist. They have an implicit reference to the outer instance. You can't create them without an outer instance.
   - Fix: Create outer instance first, then use `outer.new Inner()` syntax. Or create from within outer class methods.
   - Example:
   ```java
   class Outer {
       class Inner { }
   }

   // ❌ Wrong - no outer instance
   Outer.Inner inner = new Outer.Inner(); // Compilation error

   // ✅ Correct - with outer instance
   Outer outer = new Outer();
   Outer.Inner inner = outer.new Inner();

   // ✅ Also correct - from within outer class
   class Outer {
       class Inner { }
       void method() {
           Inner inner = new Inner(); // Implicit this
       }
   }
   ```

2. ❌ **Making inner class static when it needs outer instance**: Using static when you need access to outer instance members.
   - Why: Static nested classes don't have access to outer instance members (non-static fields/methods). They're more like a top-level class that's nested for organization.
   - Fix: Only use static if inner class doesn't need outer instance. Use non-static inner class when you need outer instance access.
   - Example:
   ```java
   class BankAccount {
       private double balance;

       // ❌ Wrong - static can't access balance
       static class Transaction {
           void process() {
               balance -= 100; // ERROR: Can't access instance field
           }
       }

       // ✅ Correct - non-static can access balance
       class Transaction {
           void process() {
               balance -= 100; // OK - has access to outer instance
           }
       }
   }
   ```

3. ❌ **Memory leaks from inner class holding outer reference**: Inner class objects living longer than outer.
   - Why: Non-static inner classes hold implicit reference to outer instance. If inner lives longer (passed to thread, stored in collection), it prevents outer from being garbage collected.
   - Fix: Use static nested class if you don't need outer reference, or be careful about lifecycle. Pass only needed data to inner class.
   - Example:
   ```java
   class Activity {
       private byte[] data = new byte[1024 * 1024]; // 1MB

       // ❌ Wrong - memory leak risk
       class AsyncTask implements Runnable {
           public void run() {
               // Long-running task
               // Holds reference to Activity, preventing GC
           }
       }

       void startTask() {
           new Thread(new AsyncTask()).start();
           // Activity can't be GC'd while thread runs!
       }

       // ✅ Correct - static with only needed data
       static class AsyncTask implements Runnable {
           private String neededData;

           AsyncTask(String data) {
               this.neededData = data;
           }

           public void run() {
               // No reference to outer Activity
           }
       }
   }
   ```

4. ❌ **Accessing ambiguous variables**: Shadowing outer class variables with same-named inner class variables.
   - Why: If inner and outer class have variables with same name, inner class's variable shadows outer's. This can cause confusion and bugs.
   - Fix: Use `OuterClass.this.variableName` to explicitly access outer variable. Or rename to avoid confusion.
   - Example:
   ```java
   class Outer {
       private int value = 10;

       class Inner {
           private int value = 20;

           void display() {
               // ❌ Ambiguous - which value?
               System.out.println(value); // Prints 20 (inner's value)

               // ✅ Correct - explicit
               System.out.println(this.value);        // 20 (inner)
               System.out.println(Outer.this.value);  // 10 (outer)
           }
       }
   }
   ```

5. ❌ **Trying to use inner class from static context**: Accessing non-static inner class from static method.
   - Why: Static methods don't have an instance (no this). Non-static inner classes need an outer instance. Can't create inner class without outer instance.
   - Fix: Either make inner class static, or create outer instance first and then create inner from it.
   - Example:
   ```java
   class Outer {
       class Inner { }

       // ❌ Wrong - no outer instance in static method
       static void staticMethod() {
           Inner inner = new Inner(); // ERROR: No enclosing instance
       }

       // ✅ Correct - create outer first
       static void staticMethod() {
           Outer outer = new Outer();
           Inner inner = outer.new Inner();
       }

       // ✅ Or make inner class static
       static class Inner { }
       static void staticMethod() {
           Inner inner = new Inner(); // OK now
       }
   }
   ```

**💡 Hints:**
- Inner classes are useful for helper classes that shouldn't be used elsewhere
- Use inner classes to implement Iterator, Comparator, or event handlers
- Inner class can have same variable names as outer class (use OuterClass.this.variable to distinguish)

**🎯 Challenge Tasks:**
1. Create a `School` class with inner `Student` class that maintains list of courses
2. Add a method to search transactions by date range
3. Implement a `Computer` class with inner `Processor`, `RAM`, and `Storage` classes
4. Create a nested inner class (inner class inside another inner class)

---

#### Exercise 2: Local Inner Classes (20 minutes)

**What you'll learn:** Defining classes within methods for specific temporary needs

**Create class: `LocalInnerClassDemo`**

**Concept:** A **local inner class** is defined within a method or scope block. It's only accessible within that method/block and can access local variables if they are final or effectively final.

```
Key Points:
- Defined inside a method
- Scope limited to the method
- Can access method's final/effectively final variables
- Cannot have access modifiers (public, private, etc.)
- Useful for one-time use implementations
```

**Step-by-Step:**

```java
import java.util.ArrayList;
import java.util.Comparator;

public class LocalInnerClassDemo {

    // Example 1: Basic local inner class
    static void demonstrateBasicLocalClass() {
        System.out.println("--- Basic Local Inner Class ---");

        String message = "Hello from local class"; // Effectively final

        // Local inner class defined inside method
        class LocalGreeter {
            void greet(String name) {
                // Can access method's local variables
                System.out.println(message + ", " + name + "!");
            }

            void greetMultiple(String... names) {
                for (String name : names) {
                    System.out.println(message + ", " + name + "!");
                }
            }
        }

        // Create and use local class
        LocalGreeter greeter = new LocalGreeter();
        greeter.greet("Alice");
        greeter.greet("Bob");
        greeter.greetMultiple("Charlie", "David", "Eve");
    }

    // Example 2: Real-world use case - Custom sorting
    static void sortProducts(ArrayList<String> products, String sortType) {
        System.out.println("\n--- Sorting Products: " + sortType + " ---");

        if (sortType.equals("ASCENDING")) {
            // Local class for ascending sort
            class AscendingComparator implements Comparator<String> {
                @Override
                public int compare(String s1, String s2) {
                    System.out.println("Comparing: " + s1 + " with " + s2);
                    return s1.compareToIgnoreCase(s2);
                }
            }

            products.sort(new AscendingComparator());

        } else if (sortType.equals("DESCENDING")) {
            // Local class for descending sort
            class DescendingComparator implements Comparator<String> {
                @Override
                public int compare(String s1, String s2) {
                    System.out.println("Comparing: " + s1 + " with " + s2);
                    return s2.compareToIgnoreCase(s1);
                }
            }

            products.sort(new DescendingComparator());

        } else if (sortType.equals("LENGTH")) {
            // Local class for length-based sort
            class LengthComparator implements Comparator<String> {
                @Override
                public int compare(String s1, String s2) {
                    System.out.println("Comparing lengths: " + s1.length() + " vs " + s2.length());
                    return Integer.compare(s1.length(), s2.length());
                }
            }

            products.sort(new LengthComparator());
        }

        System.out.println("Sorted: " + products);
    }

    // Example 3: Validator with local class
    static void validateInput(String input, String validationType) {
        System.out.println("\n--- Validating: " + input + " ---");

        // Local validator class
        class Validator {
            boolean isValid() {
                switch (validationType) {
                    case "EMAIL":
                        return input.contains("@") && input.contains(".");
                    case "PHONE":
                        return input.matches("\\d{10}");
                    case "USERNAME":
                        return input.length() >= 5 && input.matches("[a-zA-Z0-9_]+");
                    default:
                        return false;
                }
            }

            String getMessage() {
                return isValid() ?
                    input + " is a valid " + validationType :
                    input + " is NOT a valid " + validationType;
            }
        }

        Validator validator = new Validator();
        System.out.println(validator.getMessage());
    }

    // Example 4: Calculator with operation-specific classes
    static double calculate(double a, double b, String operation) {
        System.out.println("\n--- Calculating: " + a + " " + operation + " " + b + " ---");

        // Local class for calculation
        class Calculator {
            double result;

            Calculator() {
                switch (operation) {
                    case "ADD":
                        result = a + b;
                        break;
                    case "SUBTRACT":
                        result = a - b;
                        break;
                    case "MULTIPLY":
                        result = a * b;
                        break;
                    case "DIVIDE":
                        result = b != 0 ? a / b : 0;
                        break;
                    default:
                        result = 0;
                }
            }

            void display() {
                System.out.println("Result: " + result);
            }

            double getResult() {
                return result;
            }
        }

        Calculator calc = new Calculator();
        calc.display();
        return calc.getResult();
    }

    // Example 5: Data processor with statistics
    static void processNumbers(int[] numbers) {
        System.out.println("\n--- Processing Numbers ---");

        // Local class for statistics
        class Statistics {
            int sum = 0;
            int count = 0;
            int min = Integer.MAX_VALUE;
            int max = Integer.MIN_VALUE;

            void calculate() {
                for (int num : numbers) {
                    sum += num;
                    count++;
                    if (num < min) min = num;
                    if (num > max) max = num;
                }
            }

            void display() {
                System.out.println("Numbers processed: " + count);
                System.out.println("Sum: " + sum);
                System.out.println("Average: " + (double) sum / count);
                System.out.println("Min: " + min);
                System.out.println("Max: " + max);
                System.out.println("Range: " + (max - min));
            }
        }

        Statistics stats = new Statistics();
        stats.calculate();
        stats.display();
    }

    public static void main(String[] args) {
        System.out.println("===== LOCAL INNER CLASSES =====\n");

        // Example 1: Basic usage
        demonstrateBasicLocalClass();

        // Example 2: Sorting with local comparators
        ArrayList<String> products = new ArrayList<>();
        products.add("Laptop");
        products.add("Mouse");
        products.add("Keyboard");
        products.add("Monitor");
        products.add("USB");

        sortProducts(new ArrayList<>(products), "ASCENDING");
        sortProducts(new ArrayList<>(products), "DESCENDING");
        sortProducts(new ArrayList<>(products), "LENGTH");

        // Example 3: Validation
        validateInput("user@example.com", "EMAIL");
        validateInput("invalid-email", "EMAIL");
        validateInput("9876543210", "PHONE");
        validateInput("12345", "PHONE");
        validateInput("john_doe123", "USERNAME");
        validateInput("abc", "USERNAME");

        // Example 4: Calculator
        calculate(10, 5, "ADD");
        calculate(10, 5, "SUBTRACT");
        calculate(10, 5, "MULTIPLY");
        calculate(10, 5, "DIVIDE");

        // Example 5: Statistics
        int[] numbers = {15, 23, 8, 42, 16, 4, 35, 19};
        processNumbers(numbers);

        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== LOCAL INNER CLASSES =====

--- Basic Local Inner Class ---
Hello from local class, Alice!
Hello from local class, Bob!
Hello from local class, Charlie!
Hello from local class, David!
Hello from local class, Eve!

--- Sorting Products: ASCENDING ---
Comparing: Mouse with Laptop
Comparing: Keyboard with Laptop
Comparing: Keyboard with Mouse
Comparing: Monitor with Laptop
Comparing: Monitor with Mouse
Comparing: USB with Laptop
Sorted: [Keyboard, Laptop, Monitor, Mouse, USB]

--- Sorting Products: DESCENDING ---
Comparing: Laptop with Mouse
Comparing: Mouse with Keyboard
Comparing: Mouse with Monitor
Comparing: Monitor with Laptop
Comparing: Keyboard with USB
Sorted: [USB, Mouse, Monitor, Laptop, Keyboard]

--- Sorting Products: LENGTH ---
Comparing lengths: 5 vs 6
Comparing lengths: 8 vs 5
Comparing lengths: 7 vs 5
Comparing lengths: 3 vs 5
Sorted: [USB, Mouse, Laptop, Monitor, Keyboard]

--- Validating: user@example.com ---
user@example.com is a valid EMAIL

--- Validating: invalid-email ---
invalid-email is NOT a valid EMAIL

--- Validating: 9876543210 ---
9876543210 is a valid PHONE

--- Validating: 12345 ---
12345 is NOT a valid PHONE

--- Validating: john_doe123 ---
john_doe123 is a valid USERNAME

--- Validating: abc ---
abc is NOT a valid USERNAME

--- Calculating: 10.0 ADD 5.0 ---
Result: 15.0

--- Calculating: 10.0 SUBTRACT 5.0 ---
Result: 5.0

--- Calculating: 10.0 MULTIPLY 5.0 ---
Result: 50.0

--- Calculating: 10.0 DIVIDE 5.0 ---
Result: 2.0

--- Processing Numbers ---
Numbers processed: 8
Sum: 162
Average: 20.25
Min: 4
Max: 42
Range: 38

==============================
```

**✅ Success Criteria:**
- [ ] Local classes defined inside methods
- [ ] Local classes access method's local variables
- [ ] Each local class serves specific purpose
- [ ] All validations work correctly
- [ ] Statistics calculated accurately

**Common Mistakes:**

1. ❌ **Modifying captured local variables**: Trying to change local variables used by local inner class.
   - Why: Local inner classes capture local variables from enclosing method. These variables must be final or "effectively final" (not modified after initialization). Compiler enforces this to prevent concurrency issues.
   - Fix: Don't modify local variables after local class uses them. Use final fields in the local class if you need mutable state.
   - Example:
   ```java
   void method() {
       int count = 0;

       // ❌ Wrong - modifying captured variable
       class Counter {
           void increment() {
               count++; // ERROR: Local variable must be final
           }
       }

       // ✅ Correct - use instance field
       class Counter {
           private int count = 0;
           void increment() {
               count++; // OK - own field
           }
       }
   }
   ```

2. ❌ **Trying to access local class outside its method**: Referencing local class from another method.
   - Why: Local classes have method scope - they only exist within the method they're declared in. They can't be accessed from outside that method.
   - Fix: Use member inner class or static nested class if you need broader scope. Local classes are for method-local logic only.
   - Example:
   ```java
   class MyClass {
       void method1() {
           class LocalClass {
               void doSomething() { }
           }
           LocalClass obj = new LocalClass();
       }

       // ❌ Wrong - can't access LocalClass here
       void method2() {
           LocalClass obj = new LocalClass(); // ERROR: Cannot resolve symbol
       }

       // ✅ Correct - use member inner class
       class LocalClass {
           void doSomething() { }
       }

       void method2() {
           LocalClass obj = new LocalClass(); // OK now
       }
   }
   ```

3. ❌ **Adding access modifiers to local class**: Using public, private, or protected on local class.
   - Why: Local classes have automatic method scope. Access modifiers don't make sense since they're only visible within the method anyway.
   - Fix: Remove all access modifiers from local class declarations.
   - Example:
   ```java
   void method() {
       // ❌ Wrong - access modifiers not allowed
       public class LocalClass { } // Compilation error

       private class LocalClass { } // Compilation error

       // ✅ Correct - no access modifier
       class LocalClass { }
   }
   ```

4. ❌ **Declaring local class after using it**: Putting local class declaration after code that uses it.
   - Why: Local classes must be declared before they're used, just like local variables. Java reads code top to bottom.
   - Fix: Always declare local class at the beginning of the method or block, before any code that uses it.
   - Example:
   ```java
   void method() {
       // ❌ Wrong - using before declaring
       Helper helper = new Helper(); // ERROR: Cannot resolve symbol

       class Helper {
           void help() { }
       }

       // ✅ Correct - declare first
   }

   void method2() {
       // Declare at start
       class Helper {
           void help() { }
       }

       Helper helper = new Helper(); // OK now
       helper.help();
   }
   ```

5. ❌ **Using local class when lambda would be cleaner**: Creating local class for single-method interfaces.
   - Why: Local classes add boilerplate. For simple cases (especially single-method interfaces), lambdas are much more concise and readable.
   - Fix: Use lambdas for single-method interfaces (functional interfaces). Use local classes when you need multiple methods or complex state.
   - Example:
   ```java
   void sortList(List<String> list) {
       // ❌ Verbose - local class for simple comparator
       class LengthComparator implements Comparator<String> {
           public int compare(String s1, String s2) {
               return Integer.compare(s1.length(), s2.length());
           }
       }
       list.sort(new LengthComparator());

       // ✅ Correct - lambda is cleaner
       list.sort((s1, s2) -> Integer.compare(s1.length(), s2.length()));

       // Local class is fine when you need multiple methods:
       class Validator {
           boolean isValid(String s) { return s.length() > 0; }
           String getError() { return "Empty string"; }
       }
   }
   ```

**💡 Hints:**
- Local classes are perfect for one-off implementations
- Use them for custom comparators, validators, or processors
- Great alternative to anonymous classes when you need multiple methods
- Can make code more readable than lambdas for complex logic

**🎯 Challenge Tasks:**
1. Create a local class that filters array elements based on multiple conditions
2. Implement a local parser class that processes different file formats
3. Create a local class for password strength checking with detailed feedback
4. Implement a local class that generates different report formats

---

#### Exercise 3: Anonymous Inner Classes (30 minutes)

**What you'll learn:** Using anonymous classes for quick, one-time implementations

**Create class: `AnonymousInnerClassDemo`**

**Concept:** An **anonymous inner class** is a class without a name that is defined and instantiated in a single expression. Commonly used for implementing interfaces or extending classes on-the-fly.

```
Key Points:
- No class name
- Defined at point of instantiation
- Used for interfaces, abstract classes, or concrete classes
- Can override methods
- Cannot have constructors (no name!)
- Java 8+ lambdas are cleaner alternative for single-method interfaces
```

**Step-by-Step:**

```java
import java.util.ArrayList;
import java.util.Comparator;

// Interface for examples
interface Greeting {
    void greet(String name);
}

// Interface with multiple methods
interface Calculator {
    int calculate(int a, int b);
    void displayResult(int result);
}

// Abstract class
abstract class Animal {
    abstract void makeSound();
    void sleep() {
        System.out.println("Sleeping...");
    }
}

// Interface for event handling
interface ButtonClickListener {
    void onClick();
    void onDoubleClick();
}

public class AnonymousInnerClassDemo {

    public static void main(String[] args) {
        System.out.println("===== ANONYMOUS INNER CLASSES =====\n");

        // Example 1: Basic anonymous class implementing interface
        System.out.println("--- Example 1: Basic Anonymous Class ---");

        Greeting greeting = new Greeting() {
            @Override
            public void greet(String name) {
                System.out.println("Hello, " + name + "!");
                System.out.println("Welcome to anonymous classes!");
            }
        };

        greeting.greet("Alice");
        greeting.greet("Bob");

        // Example 2: Anonymous class with multiple methods
        System.out.println("\n--- Example 2: Multiple Methods ---");

        Calculator calculator = new Calculator() {
            @Override
            public int calculate(int a, int b) {
                return a + b;
            }

            @Override
            public void displayResult(int result) {
                System.out.println("Result: " + result);
            }
        };

        int sum = calculator.calculate(10, 20);
        calculator.displayResult(sum);

        // Different implementation
        Calculator multiplier = new Calculator() {
            @Override
            public int calculate(int a, int b) {
                return a * b;
            }

            @Override
            public void displayResult(int result) {
                System.out.println("Product: " + result);
            }
        };

        int product = multiplier.calculate(5, 6);
        multiplier.displayResult(product);

        // Example 3: Anonymous class extending abstract class
        System.out.println("\n--- Example 3: Extending Abstract Class ---");

        Animal dog = new Animal() {
            @Override
            void makeSound() {
                System.out.println("Woof! Woof!");
            }
        };

        Animal cat = new Animal() {
            @Override
            void makeSound() {
                System.out.println("Meow! Meow!");
            }
        };

        System.out.print("Dog: ");
        dog.makeSound();
        dog.sleep();

        System.out.print("Cat: ");
        cat.makeSound();
        cat.sleep();

        // Example 4: Anonymous class with Thread
        System.out.println("\n--- Example 4: Thread with Anonymous Class ---");

        Thread thread1 = new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 1; i <= 5; i++) {
                    System.out.println("Thread 1: " + i);
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        });

        thread1.start();

        try {
            thread1.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Example 5: Comparator with anonymous class
        System.out.println("\n--- Example 5: Sorting with Anonymous Comparator ---");

        ArrayList<String> names = new ArrayList<>();
        names.add("Charlie");
        names.add("Alice");
        names.add("Bob");
        names.add("David");

        System.out.println("Original: " + names);

        // Sort by length using anonymous class
        names.sort(new Comparator<String>() {
            @Override
            public int compare(String s1, String s2) {
                return Integer.compare(s1.length(), s2.length());
            }
        });

        System.out.println("Sorted by length: " + names);

        // Example 6: Event handling simulation
        System.out.println("\n--- Example 6: Event Handling ---");

        ButtonClickListener saveButton = new ButtonClickListener() {
            @Override
            public void onClick() {
                System.out.println("Save button clicked - Saving file...");
            }

            @Override
            public void onDoubleClick() {
                System.out.println("Save button double-clicked - Quick save!");
            }
        };

        ButtonClickListener deleteButton = new ButtonClickListener() {
            @Override
            public void onClick() {
                System.out.println("Delete button clicked - Are you sure?");
            }

            @Override
            public void onDoubleClick() {
                System.out.println("Delete button double-clicked - Permanently deleted!");
            }
        };

        System.out.println("Simulating button clicks:");
        saveButton.onClick();
        saveButton.onDoubleClick();
        deleteButton.onClick();
        deleteButton.onDoubleClick();

        // Example 7: Comparing Anonymous Class vs Lambda
        System.out.println("\n--- Example 7: Anonymous Class vs Lambda ---");

        // Anonymous class way
        System.out.println("Anonymous class:");
        Greeting greeting1 = new Greeting() {
            @Override
            public void greet(String name) {
                System.out.println("Hi, " + name + "!");
            }
        };
        greeting1.greet("John");

        // Lambda way (Java 8+) - CLEANER!
        System.out.println("\nLambda expression:");
        Greeting greeting2 = (name) -> System.out.println("Hi, " + name + "!");
        greeting2.greet("Jane");

        // Example 8: ArrayList with anonymous class filter
        System.out.println("\n--- Example 8: Custom List Operations ---");

        ArrayList<Integer> numbers = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            numbers.add(i);
        }

        System.out.println("Original numbers: " + numbers);

        // Anonymous class to filter even numbers
        ArrayList<Integer> evenNumbers = new ArrayList<Integer>() {
            {
                // Instance initializer block
                for (Integer num : numbers) {
                    if (num % 2 == 0) {
                        add(num);
                    }
                }
            }
        };

        System.out.println("Even numbers: " + evenNumbers);

        // Example 9: Real-world scenario - Payment processors
        System.out.println("\n--- Example 9: Payment Processing ---");

        interface PaymentProcessor {
            void processPayment(double amount);
            void generateReceipt(double amount);
        }

        PaymentProcessor creditCard = new PaymentProcessor() {
            @Override
            public void processPayment(double amount) {
                System.out.println("Processing credit card payment: $" + amount);
                System.out.println("Authorization successful!");
            }

            @Override
            public void generateReceipt(double amount) {
                System.out.println("Credit Card Receipt: $" + amount);
            }
        };

        PaymentProcessor paypal = new PaymentProcessor() {
            @Override
            public void processPayment(double amount) {
                System.out.println("Processing PayPal payment: $" + amount);
                System.out.println("PayPal transaction completed!");
            }

            @Override
            public void generateReceipt(double amount) {
                System.out.println("PayPal Receipt: $" + amount);
            }
        };

        // Process payments
        creditCard.processPayment(99.99);
        creditCard.generateReceipt(99.99);

        System.out.println();

        paypal.processPayment(149.99);
        paypal.generateReceipt(149.99);

        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== ANONYMOUS INNER CLASSES =====

--- Example 1: Basic Anonymous Class ---
Hello, Alice!
Welcome to anonymous classes!
Hello, Bob!
Welcome to anonymous classes!

--- Example 2: Multiple Methods ---
Result: 30
Product: 30

--- Example 3: Extending Abstract Class ---
Dog: Woof! Woof!
Sleeping...
Cat: Meow! Meow!
Sleeping...

--- Example 4: Thread with Anonymous Class ---
Thread 1: 1
Thread 1: 2
Thread 1: 3
Thread 1: 4
Thread 1: 5

--- Example 5: Sorting with Anonymous Comparator ---
Original: [Charlie, Alice, Bob, David]
Sorted by length: [Bob, Alice, David, Charlie]

--- Example 6: Event Handling ---
Simulating button clicks:
Save button clicked - Saving file...
Save button double-clicked - Quick save!
Delete button clicked - Are you sure?
Delete button double-clicked - Permanently deleted!

--- Example 7: Anonymous Class vs Lambda ---
Anonymous class:
Hi, John!

Lambda expression:
Hi, Jane!

--- Example 8: Custom List Operations ---
Original numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Even numbers: [2, 4, 6, 8, 10]

--- Example 9: Payment Processing ---
Processing credit card payment: $99.99
Authorization successful!
Credit Card Receipt: $99.99

Processing PayPal payment: $149.99
PayPal transaction completed!
PayPal Receipt: $149.99

==============================
```

**✅ Success Criteria:**
- [ ] Anonymous classes implement interfaces correctly
- [ ] Methods overridden properly
- [ ] Anonymous classes extend abstract class
- [ ] Event handling works as expected
- [ ] Understand difference between anonymous class and lambda
- [ ] Multiple implementations of same interface work independently

**Common Mistakes:**

1. ❌ **Adding constructor to anonymous class**: Trying to define a constructor in an anonymous class.
   - Why: Anonymous classes have no name, so they can't have a named constructor. However, you can use instance initializer blocks { } for initialization logic.
   - Fix: Use instance initializer block (curly braces after class body) instead of constructor.
   - Example:
   ```java
   // ❌ Wrong - no constructor allowed
   Runnable r = new Runnable() {
       public Runnable() { // ERROR: Invalid method declaration
           System.out.println("Init");
       }
       public void run() { }
   };

   // ✅ Correct - use instance initializer
   Runnable r = new Runnable() {
       {
           // Instance initializer block
           System.out.println("Init");
       }
       public void run() { }
   };
   ```

2. ❌ **Forgetting `@Override` annotation**: Not using @Override when overriding methods.
   - Why: Without @Override, typos in method name/signature won't be caught. You'll create new method instead of overriding, causing bugs.
   - Fix: Always use @Override annotation when overriding methods in anonymous classes.
   - Example:
   ```java
   // ❌ Wrong - typo not caught
   Runnable r = new Runnable() {
       public void runn() { // Typo - creates NEW method, doesn't override
           System.out.println("Running");
       }
   };

   // ✅ Correct - @Override catches errors
   Runnable r = new Runnable() {
       @Override
       public void run() { // Compiler ensures this overrides correctly
           System.out.println("Running");
       }
   };
   ```

3. ❌ **Using anonymous class when lambda is better**: Creating verbose anonymous class for single-method interface.
   - Why: Lambdas (Java 8+) are much more concise and readable for functional interfaces (single abstract method). Anonymous classes add unnecessary boilerplate.
   - Fix: Use lambdas for functional interfaces. Use anonymous classes only when you need multiple methods or want to extend concrete class.
   - Example:
   ```java
   // ❌ Verbose - anonymous class for simple case
   button.addActionListener(new ActionListener() {
       @Override
       public void actionPerformed(ActionEvent e) {
           System.out.println("Clicked");
       }
   });

   // ✅ Correct - lambda is cleaner
   button.addActionListener(e -> System.out.println("Clicked"));

   // Anonymous class is fine when you need multiple methods:
   ButtonClickListener listener = new ButtonClickListener() {
       @Override
       public void onClick() { /* ... */ }
       @Override
       public void onDoubleClick() { /* ... */ }
   };
   ```

4. ❌ **Trying to extend multiple classes**: Attempting to extend class and implement interface with ambiguous syntax.
   - Why: Java doesn't support multiple inheritance. You can only extend one class. Anonymous class can extend ONE class OR implement ONE interface.
   - Fix: Choose either extending class OR implementing interface. Use composition if you need functionality from multiple sources.
   - Example:
   ```java
   // ❌ Wrong - can't do both in one anonymous class
   // This is syntactically impossible with anonymous classes

   // ✅ Correct - extend one class
   Thread t = new Thread() {
       @Override
       public void run() {
           System.out.println("Running");
       }
   };

   // ✅ Correct - implement one interface
   Runnable r = new Runnable() {
       @Override
       public void run() {
           System.out.println("Running");
       }
   };
   ```

5. ❌ **Forgetting semicolon after anonymous class**: Missing semicolon after closing brace.
   - Why: Anonymous class is an expression, not a statement. The expression ends with semicolon. Forgetting it causes compilation error.
   - Fix: Always put semicolon after the closing brace of anonymous class instantiation.
   - Example:
   ```java
   // ❌ Wrong - no semicolon
   Runnable r = new Runnable() {
       @Override
       public void run() {
           System.out.println("Running");
       }
   } // ERROR: ';' expected

   // ✅ Correct - semicolon after brace
   Runnable r = new Runnable() {
       @Override
       public void run() {
           System.out.println("Running");
       }
   }; // Semicolon here!
   ```

**💡 Hints:**
- Use lambdas instead of anonymous classes for single-method interfaces (Java 8+)
- Anonymous classes are useful when you need multiple methods or fields
- Great for event listeners in GUI applications
- Can use instance initializer blocks `{}` for initialization logic
- Access outer class members with ClassName.this.member

**🎯 Challenge Tasks:**
1. Create anonymous classes for file reading with different formats (CSV, JSON simulation)
2. Implement multiple sorting strategies using anonymous Comparators
3. Create a GUI button simulator with various event handlers
4. Build a data validator with anonymous classes for different validation rules
5. Compare performance and readability: Anonymous Class vs Lambda vs Method Reference

---

#### Exercise 4: Static Nested Classes (25 minutes)

**What you'll learn:** Using static nested classes for better code organization

**Create class: `StaticNestedClassDemo`**

**Concept:** A **static nested class** is a static class defined inside another class. Unlike inner classes, it doesn't have access to instance members of the outer class but can access static members.

```
Key Points:
- Declared with 'static' keyword
- Doesn't need outer class instance
- Can only access static members of outer class
- Accessed as: OuterClass.StaticNestedClass
- Created as: new OuterClass.StaticNestedClass()
- Use for helper classes logically grouped with outer class
```

**Step-by-Step:**

```java
import java.util.ArrayList;

// Example 1: Basic static nested class
class OuterClass {
    private static String staticMessage = "Static message";
    private String instanceMessage = "Instance message";

    // Static nested class
    static class StaticNested {
        void display() {
            // Can access static members
            System.out.println("Static nested class accessing: " + staticMessage);

            // Cannot access instance members directly
            // System.out.println(instanceMessage); // ERROR!
        }

        void displayWithInstance(OuterClass outer) {
            // Can access instance members through outer class instance
            System.out.println("Accessing instance member: " + outer.instanceMessage);
        }
    }

    void testNestedClass() {
        StaticNested nested = new StaticNested();
        nested.display();
        nested.displayWithInstance(this);
    }
}

// Example 2: Real-world - Employee with Address
class Employee {
    private String name;
    private int id;
    private Address address;

    // Static nested class for Address
    static class Address {
        private String street;
        private String city;
        private String state;
        private String zipCode;

        Address(String street, String city, String state, String zipCode) {
            this.street = street;
            this.city = city;
            this.state = state;
            this.zipCode = zipCode;
        }

        void display() {
            System.out.println("Address:");
            System.out.println("  " + street);
            System.out.println("  " + city + ", " + state + " " + zipCode);
        }

        String getFullAddress() {
            return street + ", " + city + ", " + state + " " + zipCode;
        }
    }

    Employee(String name, int id, Address address) {
        this.name = name;
        this.id = id;
        this.address = address;
    }

    void display() {
        System.out.println("\nEmployee Details:");
        System.out.println("Name: " + name);
        System.out.println("ID: " + id);
        address.display();
    }
}

// Example 3: LinkedList with Node
class LinkedList {
    private Node head;
    private int size;

    // Static nested Node class
    static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }

        void display() {
            System.out.print(data + " ");
        }
    }

    LinkedList() {
        this.head = null;
        this.size = 0;
    }

    void add(int data) {
        Node newNode = new Node(data);

        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        size++;
    }

    void display() {
        System.out.print("LinkedList: ");
        Node current = head;
        while (current != null) {
            current.display();
            current = current.next;
        }
        System.out.println("(Size: " + size + ")");
    }

    Node getNodeAt(int index) {
        if (index < 0 || index >= size) {
            return null;
        }

        Node current = head;
        for (int i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }
}

// Example 4: University with Department
class University {
    private String name;
    private String location;
    private static int totalUniversities = 0;
    private ArrayList<Department> departments;

    // Static nested class
    static class Department {
        private String name;
        private String head;
        private int studentCount;

        Department(String name, String head, int studentCount) {
            this.name = name;
            this.head = head;
            this.studentCount = studentCount;
        }

        void display() {
            System.out.println("  Department: " + name);
            System.out.println("  Head: " + head);
            System.out.println("  Students: " + studentCount);
            System.out.println();
        }

        String getName() {
            return name;
        }

        int getStudentCount() {
            return studentCount;
        }
    }

    University(String name, String location) {
        this.name = name;
        this.location = location;
        this.departments = new ArrayList<>();
        totalUniversities++;
    }

    void addDepartment(Department dept) {
        departments.add(dept);
    }

    void display() {
        System.out.println("\n" + name + " (" + location + ")");
        System.out.println("Departments: " + departments.size());
        System.out.println("-------------------");

        for (Department dept : departments) {
            dept.display();
        }

        int totalStudents = 0;
        for (Department dept : departments) {
            totalStudents += dept.getStudentCount();
        }
        System.out.println("Total Students: " + totalStudents);
    }

    static void displayTotalUniversities() {
        System.out.println("Total Universities: " + totalUniversities);
    }
}

// Example 5: Bank with Account Types
class Bank {
    private String name;
    private ArrayList<Account> accounts;

    // Static nested class for Account
    static class Account {
        private String accountNumber;
        private String holder;
        private String type;
        private double balance;

        Account(String accountNumber, String holder, String type, double balance) {
            this.accountNumber = accountNumber;
            this.holder = holder;
            this.type = type;
            this.balance = balance;
        }

        void deposit(double amount) {
            balance += amount;
            System.out.println("Deposited $" + amount + " to " + accountNumber);
        }

        boolean withdraw(double amount) {
            if (balance >= amount) {
                balance -= amount;
                System.out.println("Withdrawn $" + amount + " from " + accountNumber);
                return true;
            } else {
                System.out.println("Insufficient funds in " + accountNumber);
                return false;
            }
        }

        void display() {
            System.out.println("\nAccount: " + accountNumber);
            System.out.println("Holder: " + holder);
            System.out.println("Type: " + type);
            System.out.println("Balance: $" + balance);
        }

        double getBalance() {
            return balance;
        }
    }

    Bank(String name) {
        this.name = name;
        this.accounts = new ArrayList<>();
    }

    void addAccount(Account account) {
        accounts.add(account);
        System.out.println("Account added to " + name);
    }

    void displayAllAccounts() {
        System.out.println("\n===== " + name + " Accounts =====");
        for (Account account : accounts) {
            account.display();
        }

        double totalBalance = 0;
        for (Account account : accounts) {
            totalBalance += account.getBalance();
        }
        System.out.println("\nTotal Bank Balance: $" + totalBalance);
    }
}

public class StaticNestedClassDemo {
    public static void main(String[] args) {
        System.out.println("===== STATIC NESTED CLASSES =====\n");

        // Example 1: Basic static nested class
        System.out.println("--- Example 1: Basic Static Nested ---");
        OuterClass.StaticNested nested = new OuterClass.StaticNested();
        nested.display();

        OuterClass outer = new OuterClass();
        outer.testNestedClass();

        // Example 2: Employee with Address
        System.out.println("\n--- Example 2: Employee with Address ---");

        // Create address independently
        Employee.Address address1 = new Employee.Address(
            "123 Main St", "New York", "NY", "10001"
        );

        Employee.Address address2 = new Employee.Address(
            "456 Oak Ave", "Los Angeles", "CA", "90001"
        );

        // Create employees
        Employee emp1 = new Employee("John Doe", 101, address1);
        Employee emp2 = new Employee("Jane Smith", 102, address2);

        emp1.display();
        emp2.display();

        // Example 3: LinkedList with static Node
        System.out.println("\n--- Example 3: LinkedList Implementation ---");

        LinkedList list = new LinkedList();
        list.add(10);
        list.add(20);
        list.add(30);
        list.add(40);
        list.add(50);

        list.display();

        // Access individual node
        LinkedList.Node node = list.getNodeAt(2);
        if (node != null) {
            System.out.print("Node at index 2: ");
            node.display();
            System.out.println();
        }

        // Example 4: University with Departments
        System.out.println("\n--- Example 4: University System ---");

        University uni1 = new University("MIT", "Cambridge, MA");
        uni1.addDepartment(new University.Department("Computer Science", "Dr. Smith", 500));
        uni1.addDepartment(new University.Department("Mathematics", "Dr. Johnson", 300));
        uni1.addDepartment(new University.Department("Physics", "Dr. Williams", 250));

        University uni2 = new University("Stanford", "Stanford, CA");
        uni2.addDepartment(new University.Department("Engineering", "Dr. Brown", 600));
        uni2.addDepartment(new University.Department("Business", "Dr. Davis", 400));

        uni1.display();
        uni2.display();

        University.displayTotalUniversities();

        // Example 5: Bank with Accounts
        System.out.println("\n--- Example 5: Bank System ---");

        Bank bank = new Bank("First National Bank");

        // Create accounts independently
        Bank.Account acc1 = new Bank.Account("ACC001", "Alice Johnson", "Savings", 5000.0);
        Bank.Account acc2 = new Bank.Account("ACC002", "Bob Smith", "Checking", 3000.0);
        Bank.Account acc3 = new Bank.Account("ACC003", "Charlie Brown", "Savings", 7500.0);

        bank.addAccount(acc1);
        bank.addAccount(acc2);
        bank.addAccount(acc3);

        // Perform transactions
        System.out.println("\n--- Transactions ---");
        acc1.deposit(1000);
        acc1.withdraw(500);
        acc2.deposit(2000);
        acc3.withdraw(1000);
        acc2.withdraw(10000); // Insufficient funds

        // Display all accounts
        bank.displayAllAccounts();

        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== STATIC NESTED CLASSES =====

--- Example 1: Basic Static Nested ---
Static nested class accessing: Static message
Static nested class accessing: Static message
Accessing instance member: Instance message

--- Example 2: Employee with Address ---

Employee Details:
Name: John Doe
ID: 101
Address:
  123 Main St
  New York, NY 10001

Employee Details:
Name: Jane Smith
ID: 102
Address:
  456 Oak Ave
  Los Angeles, CA 90001

--- Example 3: LinkedList Implementation ---
LinkedList: 10 20 30 40 50 (Size: 5)
Node at index 2: 30

--- Example 4: University System ---

MIT (Cambridge, MA)
Departments: 3
-------------------
  Department: Computer Science
  Head: Dr. Smith
  Students: 500

  Department: Mathematics
  Head: Dr. Johnson
  Students: 300

  Department: Physics
  Head: Dr. Williams
  Students: 250

Total Students: 1050

Stanford (Stanford, CA)
Departments: 2
-------------------
  Department: Engineering
  Head: Dr. Brown
  Students: 600

  Department: Business
  Head: Dr. Davis
  Students: 400

Total Students: 1000
Total Universities: 2

--- Example 5: Bank System ---
Account added to First National Bank
Account added to First National Bank
Account added to First National Bank

--- Transactions ---
Deposited $1000.0 to ACC001
Withdrawn $500.0 from ACC001
Deposited $2000.0 to ACC002
Withdrawn $1000.0 to ACC003
Insufficient funds in ACC002

===== First National Bank Accounts =====

Account: ACC001
Holder: Alice Johnson
Type: Savings
Balance: $5500.0

Account: ACC002
Holder: Bob Smith
Type: Checking
Balance: $5000.0

Account: ACC003
Holder: Charlie Brown
Type: Savings
Balance: $6500.0

Total Bank Balance: $17000.0

==============================
```

**✅ Success Criteria:**
- [ ] Static nested classes created without outer instance
- [ ] Can access static members of outer class
- [ ] Cannot access instance members directly
- [ ] Used for helper classes (Address, Node, Account)
- [ ] LinkedList implementation works correctly
- [ ] All transactions processed properly

**Common Mistakes:**

1. ❌ **Trying to access outer instance members from static nested class**: Attempting to use non-static fields/methods of outer class.
   - Why: Static nested classes don't have implicit reference to outer instance. They're "static" - like a top-level class that's nested for organization. Can only access static members of outer class.
   - Fix: Pass outer instance as parameter if needed, or make the nested class non-static (inner class) if it needs outer instance access.
   - Example:
   ```java
   class Outer {
       private int instanceField = 10;
       private static int staticField = 20;

       // ❌ Wrong - static can't access instance members
       static class Nested {
           void method() {
               System.out.println(instanceField); // ERROR: Non-static field
               System.out.println(staticField);   // OK - static field
           }
       }

       // ✅ Correct - pass outer instance if needed
       static class Nested {
           void method(Outer outer) {
               System.out.println(outer.instanceField); // OK now
               System.out.println(staticField);         // OK
           }
       }

       // ✅ Or use non-static inner class
       class Inner {
           void method() {
               System.out.println(instanceField); // OK - has outer reference
           }
       }
   }
   ```

2. ❌ **Creating static nested class instance incorrectly**: Using wrong syntax to instantiate.
   - Why: Static nested classes don't need outer instance, so syntax is different from inner classes. Use `new Outer.Nested()` not `outer.new Nested()`.
   - Fix: Use `new OuterClass.NestedClass()` syntax, like a regular class with qualified name.
   - Example:
   ```java
   class Outer {
       static class Nested { }
   }

   // ❌ Wrong - doesn't need outer instance
   Outer outer = new Outer();
   Outer.Nested nested = outer.new Nested(); // Works but unnecessary

   // ✅ Correct - no outer instance needed
   Outer.Nested nested = new Outer.Nested();
   ```

3. ❌ **Using regular inner class when static nested is sufficient**: Making class non-static when it doesn't need outer instance.
   - Why: Non-static inner classes hold implicit reference to outer instance, consuming extra memory. If you don't need outer instance access, use static to save memory.
   - Fix: Make nested class static unless it needs to access outer instance members. This is more memory-efficient.
   - Example:
   ```java
   class LinkedList {
       // ❌ Wrong - Node doesn't need outer instance access
       class Node {
           int data;
           Node next;
       }
       // Every Node holds reference to LinkedList - wastes memory

       // ✅ Correct - static because Node is self-contained
       static class Node {
           int data;
           Node next;
       }
       // No unnecessary outer reference
   }
   ```

4. ❌ **Making nested class package-private when it should be private**: Not using appropriate access modifier.
   - Why: If nested class is only used within outer class, it should be private for better encapsulation. Public/package-private exposes implementation details.
   - Fix: Use private for nested classes that are implementation details. Use public only if the nested class is part of the API.
   - Example:
   ```java
   class HashMap {
       // ❌ Wrong - Entry exposed to package
       static class Entry {
           Object key;
           Object value;
       }

       // ✅ Correct - private if internal only
       private static class Entry {
           Object key;
           Object value;
       }

       // ✅ Public if part of API
       public static class Builder {
           // Helper for creating HashMap
       }
   }
   ```

5. ❌ **Confusing static nested class with inner class**: Thinking they're the same thing.
   - Why: They're different. Static nested class is independent (like a top-level class). Inner class has reference to outer instance and can access its members.
   - Fix: Understand the difference. Use static nested for helper classes that don't need outer instance. Use inner class when you need outer instance access.
   - Example:
   ```java
   class Outer {
       private int value = 10;

       // Static nested - independent
       static class StaticNested {
           // Can't access 'value' directly
           // No implicit outer instance reference
           // More memory efficient
       }

       // Inner class - tied to outer instance
       class Inner {
           // Can access 'value' directly
           // Has implicit outer instance reference
           // Uses more memory (holds outer reference)
           void method() {
               System.out.println(value); // OK
           }
       }
   }
   ```

**💡 Hints:**
- Use static nested classes for helper classes logically grouped with outer class
- Common use cases: Builder pattern, Node in data structures, configuration classes
- Static nested classes can have any access modifier (public, private, protected)
- They behave like top-level classes except they're nested for organization
- No implicit reference to outer class instance (memory efficient)

**🎯 Challenge Tasks:**
1. Implement a HashMap with static nested Entry class
2. Create a Tree data structure with static nested TreeNode
3. Build a Builder pattern using static nested Builder class
4. Implement a Graph with static nested Edge and Vertex classes
5. Create a JSON parser with static nested classes for different JSON types

---

#### Exercise 5: Enumerations (Enums) (30 minutes)

**What you'll learn:** Using enums for type-safe constants with behavior

**Create class: `EnumDemo`**

**Concept:** An **enum** (enumeration) is a special class that represents a group of constants. Enums are type-safe, can have fields, methods, and constructors.

```
Key Points:
- Enum constants are implicitly public, static, final
- Can have constructors (must be private or package-private)
- Can have fields and methods
- Can implement interfaces
- Perfect for fixed sets of constants (days, months, directions, etc.)
- Type-safe: compiler catches errors
```

**Step-by-Step:**

```java
// Example 1: Basic enum
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

// Example 2: Enum with fields and methods
enum Size {
    SMALL("S", 10),
    MEDIUM("M", 20),
    LARGE("L", 30),
    EXTRA_LARGE("XL", 40);

    private String abbreviation;
    private int price;

    // Constructor (must be private or package-private)
    Size(String abbreviation, int price) {
        this.abbreviation = abbreviation;
        this.price = price;
    }

    // Getter methods
    public String getAbbreviation() {
        return abbreviation;
    }

    public int getPrice() {
        return price;
    }

    // Custom method
    public void displayInfo() {
        System.out.println(name() + " (" + abbreviation + "): $" + price);
    }
}

// Example 3: Enum with behavior
enum Operation {
    ADD {
        @Override
        public int apply(int a, int b) {
            return a + b;
        }
    },
    SUBTRACT {
        @Override
        public int apply(int a, int b) {
            return a - b;
        }
    },
    MULTIPLY {
        @Override
        public int apply(int a, int b) {
            return a * b;
        }
    },
    DIVIDE {
        @Override
        public int apply(int a, int b) {
            return b != 0 ? a / b : 0;
        }
    };

    // Abstract method
    public abstract int apply(int a, int b);
}

// Example 4: Planet enum with real data
enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6),
    JUPITER(1.9e+27, 7.1492e7),
    SATURN(5.688e+26, 6.0268e7),
    URANUS(8.686e+25, 2.5559e7),
    NEPTUNE(1.024e+26, 2.4746e7);

    private final double mass;   // in kilograms
    private final double radius; // in meters

    // Universal gravitational constant
    private static final double G = 6.67300E-11;

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    public double getMass() {
        return mass;
    }

    public double getRadius() {
        return radius;
    }

    // Calculate surface gravity
    public double surfaceGravity() {
        return G * mass / (radius * radius);
    }

    // Calculate weight on planet
    public double surfaceWeight(double earthWeight) {
        return earthWeight / Planet.EARTH.surfaceGravity() * surfaceGravity();
    }
}

// Example 5: Traffic Light with state machine
enum TrafficLight {
    RED("STOP", 30) {
        @Override
        public TrafficLight next() {
            return GREEN;
        }
    },
    YELLOW("CAUTION", 5) {
        @Override
        public TrafficLight next() {
            return RED;
        }
    },
    GREEN("GO", 45) {
        @Override
        public TrafficLight next() {
            return YELLOW;
        }
    };

    private String action;
    private int duration; // seconds

    TrafficLight(String action, int duration) {
        this.action = action;
        this.duration = duration;
    }

    public String getAction() {
        return action;
    }

    public int getDuration() {
        return duration;
    }

    // Abstract method for state transition
    public abstract TrafficLight next();

    public void display() {
        System.out.println("Light: " + name() + " - " + action + " (" + duration + "s)");
    }
}

// Example 6: Order Status
enum OrderStatus {
    PENDING("Order received", 1),
    PROCESSING("Processing your order", 2),
    SHIPPED("Order shipped", 3),
    DELIVERED("Order delivered", 4),
    CANCELLED("Order cancelled", -1);

    private String description;
    private int code;

    OrderStatus(String description, int code) {
        this.description = description;
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public int getCode() {
        return code;
    }

    public boolean isComplete() {
        return this == DELIVERED || this == CANCELLED;
    }

    public static OrderStatus fromCode(int code) {
        for (OrderStatus status : values()) {
            if (status.code == code) {
                return status;
            }
        }
        return null;
    }
}

// Example 7: Pizza with customization
enum PizzaSize {
    SMALL(8, 8.99),
    MEDIUM(12, 12.99),
    LARGE(16, 15.99),
    EXTRA_LARGE(20, 19.99);

    private int inches;
    private double basePrice;

    PizzaSize(int inches, double basePrice) {
        this.inches = inches;
        this.basePrice = basePrice;
    }

    public int getInches() {
        return inches;
    }

    public double getBasePrice() {
        return basePrice;
    }

    public double calculatePrice(int toppings) {
        return basePrice + (toppings * 1.50);
    }

    public void displayInfo(int toppings) {
        System.out.println(name() + " (" + inches + "\"): $" +
                         String.format("%.2f", calculatePrice(toppings)) +
                         " [Base: $" + basePrice + " + Toppings: $" + (toppings * 1.50) + "]");
    }
}

public class EnumDemo {
    public static void main(String[] args) {
        System.out.println("===== ENUMERATIONS (ENUMS) =====\n");

        // Example 1: Basic enum usage
        System.out.println("--- Example 1: Basic Enum ---");

        Day today = Day.MONDAY;
        System.out.println("Today is: " + today);

        // Switch with enum
        switch (today) {
            case MONDAY:
                System.out.println("Start of work week!");
                break;
            case FRIDAY:
                System.out.println("Almost weekend!");
                break;
            case SATURDAY:
            case SUNDAY:
                System.out.println("Weekend!");
                break;
            default:
                System.out.println("Mid-week day");
        }

        // Iterating through enum values
        System.out.println("\nAll days:");
        for (Day day : Day.values()) {
            System.out.println(day.ordinal() + ": " + day);
        }

        // Example 2: Enum with fields and methods
        System.out.println("\n--- Example 2: Enum with Fields ---");

        for (Size size : Size.values()) {
            size.displayInfo();
        }

        Size mySize = Size.LARGE;
        System.out.println("\nSelected size: " + mySize.getAbbreviation());
        System.out.println("Price: $" + mySize.getPrice());

        // Example 3: Enum with behavior
        System.out.println("\n--- Example 3: Enum with Behavior ---");

        int a = 10, b = 5;

        for (Operation op : Operation.values()) {
            System.out.println(a + " " + op + " " + b + " = " + op.apply(a, b));
        }

        // Using specific operation
        System.out.println("\nCalculation: 20 * 3 = " + Operation.MULTIPLY.apply(20, 3));

        // Example 4: Planet enum
        System.out.println("\n--- Example 4: Planet Data ---");

        double earthWeight = 70.0; // kg
        System.out.println("Earth weight: " + earthWeight + " kg\n");

        System.out.println("Your weight on other planets:");
        for (Planet planet : Planet.values()) {
            double weight = planet.surfaceWeight(earthWeight);
            System.out.printf("%s: %.2f kg (Gravity: %.2f m/s²)%n",
                            planet, weight, planet.surfaceGravity());
        }

        // Example 5: Traffic Light state machine
        System.out.println("\n--- Example 5: Traffic Light Cycle ---");

        TrafficLight light = TrafficLight.RED;

        System.out.println("Traffic light sequence:");
        for (int i = 0; i < 10; i++) {
            light.display();
            light = light.next();

            if (i < 9) {
                try {
                    Thread.sleep(100); // Simulate time passing
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }

        // Example 6: Order status tracking
        System.out.println("\n--- Example 6: Order Status ---");

        System.out.println("All order statuses:");
        for (OrderStatus status : OrderStatus.values()) {
            System.out.println(status + " [" + status.getCode() + "]: " +
                             status.getDescription() +
                             (status.isComplete() ? " (Complete)" : " (In Progress)"));
        }

        // Status progression
        System.out.println("\nOrder progression:");
        OrderStatus currentStatus = OrderStatus.PENDING;
        System.out.println("1. " + currentStatus.getDescription());

        currentStatus = OrderStatus.PROCESSING;
        System.out.println("2. " + currentStatus.getDescription());

        currentStatus = OrderStatus.SHIPPED;
        System.out.println("3. " + currentStatus.getDescription());

        currentStatus = OrderStatus.DELIVERED;
        System.out.println("4. " + currentStatus.getDescription());
        System.out.println("Order complete: " + currentStatus.isComplete());

        // Find status by code
        System.out.println("\nFinding status by code:");
        OrderStatus found = OrderStatus.fromCode(3);
        System.out.println("Code 3 is: " + found);

        // Example 7: Pizza ordering
        System.out.println("\n--- Example 7: Pizza Ordering ---");

        System.out.println("Pizza Menu:");
        for (PizzaSize size : PizzaSize.values()) {
            System.out.println("\n" + size + " (" + size.getInches() + "\" pizza):");
            System.out.println("  Base price: $" + size.getBasePrice());
            size.displayInfo(0); // No toppings
            size.displayInfo(2); // 2 toppings
            size.displayInfo(5); // 5 toppings
        }

        // Custom order
        System.out.println("\n--- Your Order ---");
        PizzaSize orderSize = PizzaSize.LARGE;
        int toppings = 3;
        System.out.println("Size: " + orderSize);
        System.out.println("Toppings: " + toppings);
        System.out.println("Total: $" + String.format("%.2f", orderSize.calculatePrice(toppings)));

        // Enum comparison
        System.out.println("\n--- Enum Comparison ---");
        Day day1 = Day.MONDAY;
        Day day2 = Day.FRIDAY;

        System.out.println(day1 + " == " + day2 + ": " + (day1 == day2));
        System.out.println(day1 + " == MONDAY: " + (day1 == Day.MONDAY));
        System.out.println("Ordinal comparison: " + day1.compareTo(day2));

        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== ENUMERATIONS (ENUMS) =====

--- Example 1: Basic Enum ---
Today is: MONDAY
Start of work week!

All days:
0: MONDAY
1: TUESDAY
2: WEDNESDAY
3: THURSDAY
4: FRIDAY
5: SATURDAY
6: SUNDAY

--- Example 2: Enum with Fields ---
SMALL (S): $10
MEDIUM (M): $20
LARGE (L): $30
EXTRA_LARGE (XL): $40

Selected size: L
Price: $30

--- Example 3: Enum with Behavior ---
10 ADD 5 = 15
10 SUBTRACT 5 = 5
10 MULTIPLY 5 = 50
10 DIVIDE 5 = 2

Calculation: 20 * 3 = 60

--- Example 4: Planet Data ---
Earth weight: 70.0 kg

Your weight on other planets:
MERCURY: 26.45 kg (Gravity: 3.70 m/s²)
VENUS: 63.40 kg (Gravity: 8.87 m/s²)
EARTH: 70.00 kg (Gravity: 9.81 m/s²)
MARS: 26.48 kg (Gravity: 3.71 m/s²)
JUPITER: 176.93 kg (Gravity: 24.79 m/s²)
SATURN: 74.57 kg (Gravity: 10.44 m/s²)
URANUS: 62.04 kg (Gravity: 8.69 m/s²)
NEPTUNE: 79.17 kg (Gravity: 11.09 m/s²)

--- Example 5: Traffic Light Cycle ---
Traffic light sequence:
Light: RED - STOP (30s)
Light: GREEN - GO (45s)
Light: YELLOW - CAUTION (5s)
Light: RED - STOP (30s)
Light: GREEN - GO (45s)
Light: YELLOW - CAUTION (5s)
Light: RED - STOP (30s)
Light: GREEN - GO (45s)
Light: YELLOW - CAUTION (5s)
Light: RED - STOP (30s)

--- Example 6: Order Status ---
All order statuses:
PENDING [1]: Order received (In Progress)
PROCESSING [2]: Processing your order (In Progress)
SHIPPED [3]: Order shipped (In Progress)
DELIVERED [4]: Order delivered (Complete)
CANCELLED [-1]: Order cancelled (Complete)

Order progression:
1. Order received
2. Processing your order
3. Order shipped
4. Order delivered
Order complete: true

Finding status by code:
Code 3 is: SHIPPED

--- Example 7: Pizza Ordering ---
Pizza Menu:

SMALL (8" pizza):
  Base price: $8.99
SMALL (8"): $8.99 [Base: $8.99 + Toppings: $0.0]
SMALL (8"): $11.99 [Base: $8.99 + Toppings: $3.0]
SMALL (8"): $16.49 [Base: $8.99 + Toppings: $7.5]

MEDIUM (12" pizza):
  Base price: $12.99
MEDIUM (12"): $12.99 [Base: $12.99 + Toppings: $0.0]
MEDIUM (12"): $15.99 [Base: $12.99 + Toppings: $3.0]
MEDIUM (12"): $20.49 [Base: $12.99 + Toppings: $7.5]

LARGE (16" pizza):
  Base price: $15.99
LARGE (16"): $15.99 [Base: $15.99 + Toppings: $0.0]
LARGE (16"): $18.99 [Base: $15.99 + Toppings: $3.0]
LARGE (16"): $23.49 [Base: $15.99 + Toppings: $7.5]

EXTRA_LARGE (20" pizza):
  Base price: $19.99
EXTRA_LARGE (20"): $19.99 [Base: $19.99 + Toppings: $0.0]
EXTRA_LARGE (20"): $22.99 [Base: $19.99 + Toppings: $3.0]
EXTRA_LARGE (20"): $27.49 [Base: $19.99 + Toppings: $7.5]

--- Your Order ---
Size: LARGE
Toppings: 3
Total: $20.49

--- Enum Comparison ---
MONDAY == FRIDAY: false
MONDAY == MONDAY: true
Ordinal comparison: -4

==============================
```

**✅ Success Criteria:**
- [ ] Enums defined with constants
- [ ] Enum constructors work correctly
- [ ] Fields and methods implemented
- [ ] Abstract methods overridden for behavior
- [ ] Switch statements with enums
- [ ] Enum iteration with values()
- [ ] Traffic light state machine transitions correctly
- [ ] All calculations accurate (planets, pizzas)

**Common Mistakes:**

1. ❌ **Making enum constructor public**: Declaring enum constructor as public or protected.
   - Why: Enum constructors MUST be private or package-private. Enums are fixed sets of constants - you can't create new instances outside the enum. Public constructor would violate this.
   - Fix: Make constructor private (or omit access modifier - it's private by default). Never use public or protected.
   - Example:
   ```java
   // ❌ Wrong - public constructor
   enum Size {
       SMALL, MEDIUM, LARGE;

       public Size() { } // Compilation error
   }

   // ✅ Correct - private constructor
   enum Size {
       SMALL("S"), MEDIUM("M"), LARGE("L");

       private String code;

       private Size(String code) { // Private (or omit - default is private)
           this.code = code;
       }
   }
   ```

2. ❌ **Forgetting semicolon after enum constants when adding fields/methods**: Missing ; after last constant.
   - Why: When enum has fields, methods, or constructors, you MUST put semicolon after the last constant. This separates constants from members.
   - Fix: Add semicolon after last enum constant if enum has any fields, methods, or constructors.
   - Example:
   ```java
   // ❌ Wrong - no semicolon
   enum Day {
       MONDAY, TUESDAY, WEDNESDAY // Missing semicolon!

       private String code;
       Day(String code) { this.code = code; }
   }

   // ✅ Correct - semicolon after constants
   enum Day {
       MONDAY, TUESDAY, WEDNESDAY; // Semicolon required here

       private String code;
       Day(String code) { this.code = code; }
   }
   ```

3. ❌ **Using `new` to create enum instances**: Trying to instantiate enum with new keyword.
   - Why: Enums are constants - all instances are created when enum is loaded. You can't create new enum instances. Use the constant directly.
   - Fix: Reference enum constants directly: `Day.MONDAY`, never `new Day()`.
   - Example:
   ```java
   enum Day {
       MONDAY, TUESDAY, WEDNESDAY
   }

   // ❌ Wrong - can't use new
   Day day = new Day(); // Compilation error

   // ✅ Correct - use constant
   Day day = Day.MONDAY;
   ```

4. ❌ **Comparing enums with `.equals()` instead of `==`**: Using equals for enum comparison.
   - Why: Enums are singletons - only one instance of each constant exists. Using == is faster, more concise, and null-safe (equals throws NPE on null).
   - Fix: Always use == to compare enums. It's the recommended practice.
   - Example:
   ```java
   Day day = Day.MONDAY;

   // ❌ Unnecessary - equals works but not recommended
   if (day.equals(Day.MONDAY)) { }

   // ❌ Dangerous - NPE if day is null
   if (day.equals(Day.MONDAY)) { } // NullPointerException if day is null

   // ✅ Correct - use ==
   if (day == Day.MONDAY) { } // Faster, null-safe, recommended
   ```

5. ❌ **Misspelling enum constant name**: Using wrong case or typo in constant name.
   - Why: Enum constants are case-sensitive. Typo causes compilation error. IDE can't always auto-correct.
   - Fix: Use exact constant name. Follow convention: UPPER_CASE_WITH_UNDERSCORES. Use IDE auto-completion.
   - Example:
   ```java
   enum Status {
       PENDING, APPROVED, REJECTED
   }

   // ❌ Wrong - case matters
   Status s = Status.pending;   // ERROR: cannot find symbol
   Status s = Status.Pending;   // ERROR: cannot find symbol
   Status s = Status.APROVED;   // ERROR: typo

   // ✅ Correct - exact name
   Status s = Status.PENDING;
   Status s = Status.APPROVED;
   Status s = Status.REJECTED;
   ```

**💡 Hints:**
- Use enums instead of static final constants for type safety
- Enums can implement interfaces for polymorphic behavior
- Use `values()` to get all enum constants
- Use `ordinal()` to get position (0-based)
- Use `valueOf(String)` to get enum from string
- Enums are naturally thread-safe singletons
- Great for state machines, strategies, and fixed sets

**🎯 Challenge Tasks:**
1. Create a CardGame enum with SUITS and RANKS
2. Implement a Currency converter with enum for currencies
3. Build a RoleBasedAccessControl system with enum for roles and permissions
4. Create a WeatherCondition enum with temperature ranges and recommendations
5. Implement a PaymentMethod enum with processing logic for each method

---

#### Exercise 6: Real-World Application - Restaurant Order System (30 minutes)

**What you'll learn:** Combining inner classes, nested classes, and enums in a complete application

**Create class: `RestaurantOrderSystem`**

**Concept:** Build a comprehensive restaurant ordering system that uses:
- Enums for menu categories, order status, and payment methods
- Member inner classes for order items
- Static nested classes for customer information
- Anonymous classes for custom discounts

**Step-by-Step:**

```java
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// Enums for the system
enum MenuCategory {
    APPETIZER("Starters", 1),
    MAIN_COURSE("Main Dishes", 2),
    DESSERT("Sweets", 3),
    BEVERAGE("Drinks", 4);

    private String displayName;
    private int order;

    MenuCategory(String displayName, int order) {
        this.displayName = displayName;
        this.order = order;
    }

    public String getDisplayName() {
        return displayName;
    }

    public int getOrder() {
        return order;
    }
}

enum OrderStatus {
    PLACED("Order placed", "Waiting for confirmation"),
    CONFIRMED("Order confirmed", "Kitchen is preparing"),
    PREPARING("Preparing", "Chef is cooking"),
    READY("Ready", "Ready for pickup/delivery"),
    DELIVERED("Delivered", "Enjoy your meal!"),
    CANCELLED("Cancelled", "Order has been cancelled");

    private String status;
    private String message;

    OrderStatus(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public void display() {
        System.out.println("[" + status + "] " + message);
    }
}

enum PaymentMethod {
    CASH {
        @Override
        public void processPayment(double amount) {
            System.out.println("Processing cash payment: $" + String.format("%.2f", amount));
            System.out.println("Please have exact change ready");
        }
    },
    CREDIT_CARD {
        @Override
        public void processPayment(double amount) {
            System.out.println("Processing credit card: $" + String.format("%.2f", amount));
            System.out.println("Card authorized successfully");
        }
    },
    DEBIT_CARD {
        @Override
        public void processPayment(double amount) {
            System.out.println("Processing debit card: $" + String.format("%.2f", amount));
            System.out.println("Payment deducted from account");
        }
    },
    DIGITAL_WALLET {
        @Override
        public void processPayment(double amount) {
            System.out.println("Processing digital wallet: $" + String.format("%.2f", amount));
            System.out.println("Payment completed via app");
        }
    };

    public abstract void processPayment(double amount);

    public double applyProcessingFee(double amount) {
        return this == CREDIT_CARD ? amount * 1.03 : amount; // 3% fee for credit card
    }
}

// Interface for discount strategy (to be implemented with anonymous classes)
interface DiscountStrategy {
    double applyDiscount(double amount);
    String getDiscountDescription();
}

// Main Restaurant class
class Restaurant {
    private String name;
    private ArrayList<Order> orders;
    private int nextOrderNumber;

    // Static nested class for Customer
    static class Customer {
        private String name;
        private String phone;
        private String email;
        private Address address;

        // Another static nested class for Address
        static class Address {
            private String street;
            private String city;
            private String zipCode;

            Address(String street, String city, String zipCode) {
                this.street = street;
                this.city = city;
                this.zipCode = zipCode;
            }

            @Override
            public String toString() {
                return street + ", " + city + " " + zipCode;
            }
        }

        Customer(String name, String phone, String email, Address address) {
            this.name = name;
            this.phone = phone;
            this.email = email;
            this.address = address;
        }

        void display() {
            System.out.println("Customer: " + name);
            System.out.println("Phone: " + phone);
            System.out.println("Email: " + email);
            System.out.println("Address: " + address);
        }

        String getName() {
            return name;
        }
    }

    // Member inner class for Order
    class Order {
        private int orderNumber;
        private Customer customer;
        private ArrayList<OrderItem> items;
        private OrderStatus status;
        private PaymentMethod paymentMethod;
        private LocalDateTime orderTime;
        private DiscountStrategy discountStrategy;

        // Inner class within Order for OrderItem
        class OrderItem {
            private String itemName;
            private MenuCategory category;
            private double price;
            private int quantity;
            private String specialInstructions;

            OrderItem(String itemName, MenuCategory category, double price, int quantity, String specialInstructions) {
                this.itemName = itemName;
                this.category = category;
                this.price = price;
                this.quantity = quantity;
                this.specialInstructions = specialInstructions;
            }

            double getTotal() {
                return price * quantity;
            }

            void display() {
                System.out.printf("  %s [%s] x%d - $%.2f each = $%.2f%n",
                                itemName, category.getDisplayName(), quantity, price, getTotal());
                if (specialInstructions != null && !specialInstructions.isEmpty()) {
                    System.out.println("    Note: " + specialInstructions);
                }
            }
        }

        Order(Customer customer, PaymentMethod paymentMethod) {
            this.orderNumber = nextOrderNumber++;
            this.customer = customer;
            this.items = new ArrayList<>();
            this.status = OrderStatus.PLACED;
            this.paymentMethod = paymentMethod;
            this.orderTime = LocalDateTime.now();
            this.discountStrategy = null;
        }

        void addItem(String itemName, MenuCategory category, double price, int quantity, String specialInstructions) {
            OrderItem item = new OrderItem(itemName, category, price, quantity, specialInstructions);
            items.add(item);
            System.out.println("Added: " + itemName + " x" + quantity);
        }

        void setDiscountStrategy(DiscountStrategy strategy) {
            this.discountStrategy = strategy;
        }

        double calculateSubtotal() {
            double subtotal = 0;
            for (OrderItem item : items) {
                subtotal += item.getTotal();
            }
            return subtotal;
        }

        double calculateTotal() {
            double subtotal = calculateSubtotal();

            // Apply discount if available
            if (discountStrategy != null) {
                subtotal = discountStrategy.applyDiscount(subtotal);
            }

            // Apply tax
            double tax = subtotal * 0.08; // 8% tax

            // Apply payment processing fee
            double total = subtotal + tax;
            total = paymentMethod.applyProcessingFee(total);

            return total;
        }

        void updateStatus(OrderStatus newStatus) {
            this.status = newStatus;
            System.out.println("\n--- Order Status Updated ---");
            status.display();
        }

        void displayReceipt() {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

            System.out.println("\n" + "=".repeat(50));
            System.out.println("          " + name);
            System.out.println("            ORDER RECEIPT");
            System.out.println("=".repeat(50));
            System.out.println("Order #: " + orderNumber);
            System.out.println("Date: " + orderTime.format(formatter));
            System.out.println("Status: " + status.getStatus());
            System.out.println("-".repeat(50));

            customer.display();

            System.out.println("-".repeat(50));
            System.out.println("ORDER DETAILS:");
            System.out.println();

            for (OrderItem item : items) {
                item.display();
            }

            System.out.println("-".repeat(50));
            double subtotal = calculateSubtotal();
            System.out.printf("Subtotal:          $%.2f%n", subtotal);

            if (discountStrategy != null) {
                double discounted = discountStrategy.applyDiscount(subtotal);
                double discountAmount = subtotal - discounted;
                System.out.printf("Discount (%s): -$%.2f%n",
                                discountStrategy.getDiscountDescription(), discountAmount);
                subtotal = discounted;
            }

            double tax = subtotal * 0.08;
            System.out.printf("Tax (8%%):          $%.2f%n", tax);

            double beforeFee = subtotal + tax;
            if (paymentMethod == PaymentMethod.CREDIT_CARD) {
                double fee = beforeFee * 0.03;
                System.out.printf("Processing Fee:    $%.2f%n", fee);
            }

            System.out.printf("TOTAL:            $%.2f%n", calculateTotal());
            System.out.println("-".repeat(50));
            System.out.println("Payment Method: " + paymentMethod);
            System.out.println("=".repeat(50));
        }

        void processPayment() {
            System.out.println("\n--- Processing Payment ---");
            double total = calculateTotal();
            paymentMethod.processPayment(total);
            System.out.println("Payment successful!");
        }
    }

    Restaurant(String name) {
        this.name = name;
        this.orders = new ArrayList<>();
        this.nextOrderNumber = 1000;
    }

    Order createOrder(Customer customer, PaymentMethod paymentMethod) {
        Order order = new Order(customer, paymentMethod);
        orders.add(order);
        System.out.println("\n--- New Order Created ---");
        System.out.println("Order #: " + order.orderNumber);
        System.out.println("Customer: " + customer.getName());
        return order;
    }

    void displayAllOrders() {
        System.out.println("\n=== ALL ORDERS ===");
        for (Order order : orders) {
            System.out.println("Order #" + order.orderNumber + " - " +
                             order.customer.getName() + " - " +
                             order.status.getStatus());
        }
    }
}

public class RestaurantOrderSystem {
    public static void main(String[] args) {
        System.out.println("===== RESTAURANT ORDER SYSTEM =====\n");

        // Create restaurant
        Restaurant restaurant = new Restaurant("Java Bistro");

        // Create customers with addresses
        Restaurant.Customer.Address addr1 = new Restaurant.Customer.Address(
            "123 Main St", "New York", "10001"
        );

        Restaurant.Customer.Address addr2 = new Restaurant.Customer.Address(
            "456 Oak Ave", "Boston", "02101"
        );

        Restaurant.Customer customer1 = new Restaurant.Customer(
            "John Doe", "555-0101", "john@email.com", addr1
        );

        Restaurant.Customer customer2 = new Restaurant.Customer(
            "Jane Smith", "555-0102", "jane@email.com", addr2
        );

        // Create Order 1
        System.out.println("\n========== ORDER 1 ==========");
        Restaurant.Order order1 = restaurant.createOrder(customer1, PaymentMethod.CREDIT_CARD);

        order1.addItem("Caesar Salad", MenuCategory.APPETIZER, 8.99, 2, "No croutons");
        order1.addItem("Grilled Salmon", MenuCategory.MAIN_COURSE, 24.99, 1, "Medium rare");
        order1.addItem("Chocolate Cake", MenuCategory.DESSERT, 7.99, 1, "");
        order1.addItem("Iced Tea", MenuCategory.BEVERAGE, 2.99, 2, "Extra ice");

        // Apply discount using anonymous class - First time customer
        order1.setDiscountStrategy(new DiscountStrategy() {
            @Override
            public double applyDiscount(double amount) {
                return amount * 0.90; // 10% off
            }

            @Override
            public String getDiscountDescription() {
                return "First Time Customer 10%";
            }
        });

        order1.displayReceipt();
        order1.processPayment();

        // Update order status
        order1.updateStatus(OrderStatus.CONFIRMED);
        order1.updateStatus(OrderStatus.PREPARING);
        order1.updateStatus(OrderStatus.READY);
        order1.updateStatus(OrderStatus.DELIVERED);

        // Create Order 2
        System.out.println("\n\n========== ORDER 2 ==========");
        Restaurant.Order order2 = restaurant.createOrder(customer2, PaymentMethod.DIGITAL_WALLET);

        order2.addItem("Spring Rolls", MenuCategory.APPETIZER, 6.99, 1, "");
        order2.addItem("Vegetarian Pasta", MenuCategory.MAIN_COURSE, 18.99, 2, "Extra cheese");
        order2.addItem("Tiramisu", MenuCategory.DESSERT, 8.99, 2, "");
        order2.addItem("Cappuccino", MenuCategory.BEVERAGE, 4.99, 2, "Decaf");

        // Apply discount using anonymous class - Loyalty discount
        order2.setDiscountStrategy(new DiscountStrategy() {
            @Override
            public double applyDiscount(double amount) {
                if (amount > 50) {
                    return amount * 0.85; // 15% off for orders over $50
                }
                return amount;
            }

            @Override
            public String getDiscountDescription() {
                return "Loyalty Member 15%";
            }
        });

        order2.displayReceipt();
        order2.processPayment();

        order2.updateStatus(OrderStatus.CONFIRMED);
        order2.updateStatus(OrderStatus.PREPARING);

        // Create Order 3 - No discount
        System.out.println("\n\n========== ORDER 3 ==========");

        Restaurant.Customer.Address addr3 = new Restaurant.Customer.Address(
            "789 Elm St", "Chicago", "60601"
        );

        Restaurant.Customer customer3 = new Restaurant.Customer(
            "Bob Johnson", "555-0103", "bob@email.com", addr3
        );

        Restaurant.Order order3 = restaurant.createOrder(customer3, PaymentMethod.CASH);

        order3.addItem("Mozzarella Sticks", MenuCategory.APPETIZER, 7.99, 1, "Extra marinara");
        order3.addItem("Beef Burger", MenuCategory.MAIN_COURSE, 15.99, 1, "Well done");
        order3.addItem("French Fries", MenuCategory.MAIN_COURSE, 4.99, 1, "");
        order3.addItem("Soda", MenuCategory.BEVERAGE, 2.49, 1, "No ice");

        order3.displayReceipt();
        order3.processPayment();

        // Display all orders
        restaurant.displayAllOrders();

        // Demonstrate enum features
        System.out.println("\n\n========== MENU CATEGORIES ==========");
        for (MenuCategory category : MenuCategory.values()) {
            System.out.println(category.getOrder() + ". " + category.getDisplayName());
        }

        System.out.println("\n========== ORDER STATUSES ==========");
        for (OrderStatus status : OrderStatus.values()) {
            status.display();
        }

        System.out.println("\n========== PAYMENT METHODS ==========");
        for (PaymentMethod method : PaymentMethod.values()) {
            System.out.println(method);
        }

        System.out.println("\n\n===================================");
        System.out.println("Restaurant Order System Complete!");
        System.out.println("===================================");
    }
}
```

**Expected Output:**
```
===== RESTAURANT ORDER SYSTEM =====


========== ORDER 1 ==========

--- New Order Created ---
Order #: 1000
Customer: John Doe
Added: Caesar Salad x2
Added: Grilled Salmon x1
Added: Chocolate Cake x1
Added: Iced Tea x2

==================================================
          Java Bistro
            ORDER RECEIPT
==================================================
Order #: 1000
Date: 2024-01-24 10:30:45
Status: Order placed
--------------------------------------------------
Customer: John Doe
Phone: 555-0101
Email: john@email.com
Address: 123 Main St, New York 10001
--------------------------------------------------
ORDER DETAILS:

  Caesar Salad [Starters] x2 - $8.99 each = $17.98
    Note: No croutons
  Grilled Salmon [Main Dishes] x1 - $24.99 each = $24.99
    Note: Medium rare
  Chocolate Cake [Sweets] x1 - $7.99 each = $7.99
  Iced Tea [Drinks] x2 - $2.99 each = $5.98
--------------------------------------------------
Subtotal:          $56.94
Discount (First Time Customer 10%): -$5.69
Tax (8%):          $4.10
Processing Fee:    $1.59
TOTAL:            $57.83
--------------------------------------------------
Payment Method: CREDIT_CARD
==================================================

--- Processing Payment ---
Processing credit card: $57.83
Card authorized successfully
Payment successful!

--- Order Status Updated ---
[Order confirmed] Kitchen is preparing

--- Order Status Updated ---
[Preparing] Chef is cooking

--- Order Status Updated ---
[Ready] Ready for pickup/delivery

--- Order Status Updated ---
[Delivered] Enjoy your meal!


========== ORDER 2 ==========

--- New Order Created ---
Order #: 1001
Customer: Jane Smith
Added: Spring Rolls x1
Added: Vegetarian Pasta x2
Added: Tiramisu x2
Added: Cappuccino x2

==================================================
          Java Bistro
            ORDER RECEIPT
==================================================
Order #: 1001
Date: 2024-01-24 10:30:45
Status: Order placed
--------------------------------------------------
Customer: Jane Smith
Phone: 555-0102
Email: jane@email.com
Address: 456 Oak Ave, Boston 02101
--------------------------------------------------
ORDER DETAILS:

  Spring Rolls [Starters] x1 - $6.99 each = $6.99
  Vegetarian Pasta [Main Dishes] x2 - $18.99 each = $37.98
    Note: Extra cheese
  Tiramisu [Sweets] x2 - $8.99 each = $17.98
  Cappuccino [Drinks] x2 - $4.99 each = $9.98
    Note: Decaf
--------------------------------------------------
Subtotal:          $73.93
Discount (Loyalty Member 15%): -$11.09
Tax (8%):          $5.03
TOTAL:            $67.87
--------------------------------------------------
Payment Method: DIGITAL_WALLET
==================================================

--- Processing Payment ---
Processing digital wallet: $67.87
Payment completed via app
Payment successful!

--- Order Status Updated ---
[Order confirmed] Kitchen is preparing

--- Order Status Updated ---
[Preparing] Chef is cooking


========== ORDER 3 ==========

--- New Order Created ---
Order #: 1002
Customer: Bob Johnson
Added: Mozzarella Sticks x1
Added: Beef Burger x1
Added: French Fries x1
Added: Soda x1

==================================================
          Java Bistro
            ORDER RECEIPT
==================================================
Order #: 1002
Date: 2024-01-24 10:30:45
Status: Order placed
--------------------------------------------------
Customer: Bob Johnson
Phone: 555-0103
Email: bob@email.com
Address: 789 Elm St, Chicago 60601
--------------------------------------------------
ORDER DETAILS:

  Mozzarella Sticks [Starters] x1 - $7.99 each = $7.99
    Note: Extra marinara
  Beef Burger [Main Dishes] x1 - $15.99 each = $15.99
    Note: Well done
  French Fries [Main Dishes] x1 - $4.99 each = $4.99
  Soda [Drinks] x1 - $2.49 each = $2.49
--------------------------------------------------
Subtotal:          $31.46
Tax (8%):          $2.52
TOTAL:            $33.98
--------------------------------------------------
Payment Method: CASH
==================================================

--- Processing Payment ---
Processing cash payment: $33.98
Please have exact change ready
Payment successful!

=== ALL ORDERS ===
Order #1000 - John Doe - Delivered
Order #1001 - Jane Smith - Preparing
Order #1002 - Bob Johnson - Order placed


========== MENU CATEGORIES ==========
1. Starters
2. Main Dishes
3. Sweets
4. Drinks

========== ORDER STATUSES ==========
[Order placed] Waiting for confirmation
[Order confirmed] Kitchen is preparing
[Preparing] Chef is cooking
[Ready] Ready for pickup/delivery
[Delivered] Enjoy your meal!
[Cancelled] Order has been cancelled

========== PAYMENT METHODS ==========
CASH
CREDIT_CARD
DEBIT_CARD
DIGITAL_WALLET


===================================
Restaurant Order System Complete!
===================================
```

**✅ Success Criteria:**
- [ ] Enums used for categories, status, and payment methods
- [ ] Static nested classes for Customer and Address
- [ ] Member inner class for Order
- [ ] Inner class within Order for OrderItem
- [ ] Anonymous classes for discount strategies
- [ ] All calculations correct (subtotal, tax, fees, discounts)
- [ ] Order status transitions work
- [ ] Multiple payment methods processed correctly
- [ ] Receipts display all information properly

**Common Mistakes:**

1. ❌ **Trying to access Order before creating Restaurant**: Attempting to use inner class without outer instance.
   - Why: Order is a non-static member inner class of Restaurant. It needs a Restaurant instance to exist. You can't access it without creating Restaurant first.
   - Fix: Create Restaurant instance before trying to create Order. Use `restaurant.new Order()` syntax.
   - Example:
   ```java
   // ❌ Wrong - Order needs Restaurant instance
   Restaurant.Order order = new Restaurant.Order(...); // ERROR

   // ✅ Correct - create Restaurant first
   Restaurant restaurant = new Restaurant("My Restaurant");
   Restaurant.Order order = restaurant.createOrder(...);
   ```

2. ❌ **Making Customer non-static when it should be static**: Using inner class when static nested class is better.
   - Why: Customer doesn't need access to Restaurant instance - it's a standalone data structure. Making it non-static wastes memory with unnecessary outer reference.
   - Fix: Make Customer static nested class since it doesn't need Restaurant instance. Only make classes non-static when they need outer instance access.
   - Example:
   ```java
   class Restaurant {
       // ❌ Wrong - Customer doesn't need Restaurant instance
       class Customer {
           String name;
           String phone;
       }
       // Every Customer holds reference to Restaurant unnecessarily

       // ✅ Correct - static because it's independent
       static class Customer {
           String name;
           String phone;
       }
       // No unnecessary outer reference
   }
   ```

3. ❌ **Hardcoding discount values instead of using strategy pattern**: Using fixed discount percentages in code.
   - Why: Hardcoded values aren't flexible or maintainable. Can't easily add new discount types or change logic without modifying class.
   - Fix: Use strategy pattern with interface. Pass different discount strategies as anonymous classes or lambdas.
   - Example:
   ```java
   // ❌ Wrong - hardcoded discount
   class Order {
       double calculateTotal() {
           double total = getSubtotal();
           total = total * 0.90; // Hardcoded 10% discount
           return total;
       }
   }

   // ✅ Correct - strategy pattern
   interface DiscountStrategy {
       double applyDiscount(double amount);
   }

   class Order {
       private DiscountStrategy discount;

       void setDiscount(DiscountStrategy strategy) {
           this.discount = strategy;
       }

       double calculateTotal() {
           double total = getSubtotal();
           if (discount != null) {
               total = discount.applyDiscount(total);
           }
           return total;
       }
   }
   ```

4. ❌ **Forgetting to apply all charges in calculateTotal()**: Missing tax, fees, or discounts in total calculation.
   - Why: If you forget any charge, total will be incorrect. This is a business logic bug that causes incorrect billing.
   - Fix: Calculate total in specific order: subtotal → discount → tax → fees. Document the calculation order.
   - Example:
   ```java
   // ❌ Wrong - missing tax
   double calculateTotal() {
       double total = getSubtotal();
       if (discount != null) {
           total = discount.applyDiscount(total);
       }
       // Forgot to add tax!
       return total;
   }

   // ✅ Correct - all charges included
   double calculateTotal() {
       // 1. Start with subtotal
       double total = getSubtotal();

       // 2. Apply discount
       if (discount != null) {
           total = discount.applyDiscount(total);
       }

       // 3. Add tax
       double tax = total * 0.08;
       total += tax;

       // 4. Add payment processing fee
       total = paymentMethod.applyProcessingFee(total);

       return total;
   }
   ```

5. ❌ **Not formatting currency properly**: Displaying monetary values without proper decimal formatting.
   - Why: Raw double values show inconsistent decimals (1.5 instead of 1.50). This looks unprofessional and can confuse users.
   - Fix: Always format currency with 2 decimal places using String.format("%.2f", amount).
   - Example:
   ```java
   // ❌ Wrong - inconsistent formatting
   System.out.println("Total: $" + total); // Might show $10.5 or $10.500000001

   // ✅ Correct - formatted to 2 decimals
   System.out.printf("Total: $%.2f%n", total); // Shows $10.50

   // Or with String.format
   String formatted = String.format("$%.2f", total);
   System.out.println("Total: " + formatted);
   ```

**💡 Hints:**
- Use enums for fixed sets: status, categories, payment methods
- Use static nested classes for data holders: Customer, Address
- Use member inner classes when they need access to outer instance: Order needs Restaurant
- Use anonymous classes for one-off implementations: discount strategies
- Organize code logically: enums at top, then outer class, then nested classes
- Consider using Builder pattern for complex objects like Order

**🎯 Challenge Tasks:**
1. Add a Menu class with items that can be searched and filtered
2. Implement order modifications (add/remove items after creation)
3. Add a table reservation system with nested classes
4. Create a reporting system that generates sales summaries
5. Implement a review system where customers can rate orders
6. Add loyalty points calculation using an inner class
7. Create different order types (Dine-in, Takeout, Delivery) as an enum with specific behavior
8. Implement order history tracking per customer

---

**🎉 Day 30 Complete! Key Takeaways:**
- **Member Inner Classes**: Provide access to outer class members, used for closely related functionality
- **Local Inner Classes**: Defined in methods, useful for temporary implementations
- **Anonymous Inner Classes**: Quick implementations without separate class files
- **Static Nested Classes**: Independent helper classes that don't need outer instance
- **Enums**: Type-safe constants with behavior, perfect for fixed sets
- **Real-World Usage**: Combining all concepts creates robust, maintainable systems

**Next Steps:**
- Study Design Patterns (Strategy, Builder, Factory using inner classes)
- Explore Java Collections framework (which uses inner classes extensively)
- Learn about Functional Interfaces and how they relate to anonymous classes
- Practice refactoring code to use appropriate inner class types
- Build more complex applications combining these concepts

---

**End of Day 30 Exercises**

