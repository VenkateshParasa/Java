export default {
  title: "Day 27: Multithreading Basics Assessment",
  description: "Test your understanding of threads, concurrency, and synchronization",
  passingScore: 70,
  timeLimit: 30, // minutes
  modes: {
    quick: {
      questionCount: 9,
      timeLimit: 15,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 13,
      timeLimit: 30,
      sections: ['section-a', 'section-b', 'section-c']
    }
  },
  sections: [
    {
      id: 'section-a',
      title: 'Multiple Choice Questions',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'What is a thread?',
          options: [
            'A process',
            'A lightweight subprocess',
            'A method',
            'A class'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A thread is a lightweight subprocess, the smallest unit of processing. Multiple threads can run concurrently within a process.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'How many ways can you create a thread?',
          options: [
            'One',
            'Two',
            'Three',
            'Four'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Two ways: 1) Extend Thread class. 2) Implement Runnable interface. Runnable is preferred as Java doesn\'t support multiple inheritance.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which method do you override to define thread behavior?',
          options: [
            'start()',
            'run()',
            'execute()',
            'begin()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Override the run() method to define what the thread should do when it executes.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'Which method actually starts a thread?',
          options: [
            'run()',
            'start()',
            'execute()',
            'begin()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Call start() to begin thread execution. It creates a new thread and calls run(). Calling run() directly executes in the same thread.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What happens if you call run() instead of start()?',
          options: [
            'Thread starts',
            'Runs in same thread (no new thread)',
            'Error',
            'Exception'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Calling run() directly executes the method in the current thread, not creating a new thread. Always use start().'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Which method pauses thread execution?',
          options: [
            'pause()',
            'wait()',
            'sleep()',
            'stop()'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'Thread.sleep(milliseconds) pauses the current thread for the specified time. wait() is for inter-thread communication.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is synchronization used for?',
          options: [
            'Speed up threads',
            'Prevent concurrent access to shared resource',
            'Create threads',
            'Stop threads'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Synchronization prevents multiple threads from accessing shared resources simultaneously, avoiding race conditions and data inconsistency.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q8',
          type: 'short',
          question: 'Explain the difference between extending Thread class and implementing Runnable interface.',
          sampleAnswer: 'Extending Thread: class MyThread extends Thread. Pros: Simple, direct access to Thread methods. Cons: Cannot extend another class (single inheritance). Implementing Runnable: class MyTask implements Runnable. Pros: Can extend another class, better OOP design, can share same Runnable instance among threads. Cons: Need to create Thread object separately. Runnable is preferred because: 1) Separation of task from thread. 2) Flexibility with inheritance. 3) Can use with thread pools.',
          points: 3,
          difficulty: 'medium',
          keywords: ['Thread', 'Runnable', 'extends', 'implements', 'inheritance', 'OOP', 'preferred', 'interface']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What is the difference between start() and run() methods?',
          sampleAnswer: 'start() creates a new thread and calls run() in that new thread. It can only be called once per thread object. run() is the method containing the thread\'s code. Calling run() directly executes it in the current thread (no new thread created). Example: thread.start() - creates new thread. thread.run() - executes in same thread like a normal method call. Always use start() to begin thread execution.',
          points: 3,
          difficulty: 'medium',
          keywords: ['start', 'run', 'new thread', 'current thread', 'execute', 'method', 'difference']
        },
        {
          id: 'q10',
          type: 'short',
          question: 'What problem does synchronization solve?',
          sampleAnswer: 'Synchronization solves race conditions and data inconsistency when multiple threads access shared resources. Problem: Thread A reads value 10, Thread B reads value 10, both increment to 11, write 11 (should be 12). Solution: synchronized keyword ensures only one thread accesses the critical section at a time. Types: 1) Synchronized method - entire method locked. 2) Synchronized block - specific code locked. Benefits: Thread safety, data consistency. Cost: Performance overhead, potential deadlock.',
          points: 3,
          difficulty: 'hard',
          keywords: ['synchronization', 'race condition', 'shared resource', 'thread safety', 'synchronized', 'critical section', 'data inconsistency']
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Coding Problems',
      questions: [
        {
          id: 'q11',
          type: 'short',
          question: 'Create a thread by extending Thread class that prints numbers 1 to 10.',
          sampleAnswer: `class NumberThread extends Thread {
    @Override
    public void run() {
        for (int i = 1; i <= 10; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
            try {
                Thread.sleep(100); // Pause for 100ms
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted");
            }
        }
    }
}

public class ThreadDemo1 {
    public static void main(String[] args) {
        System.out.println("Main thread: " + Thread.currentThread().getName());
        
        // Create and start thread
        NumberThread thread1 = new NumberThread();
        thread1.setName("Counter-1");
        thread1.start();
        
        // Create another thread
        NumberThread thread2 = new NumberThread();
        thread2.setName("Counter-2");
        thread2.start();
        
        // Main thread continues
        System.out.println("Main thread continues...");
        
        // Wait for threads to complete
        try {
            thread1.join(); // Wait for thread1 to finish
            thread2.join(); // Wait for thread2 to finish
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("All threads completed!");
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['Thread', 'extends', 'run', 'start', 'sleep', 'join', 'InterruptedException', 'override']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Create a thread by implementing Runnable interface that prints your name 5 times.',
          sampleAnswer: `class NamePrinter implements Runnable {
    private String name;
    
    public NamePrinter(String name) {
        this.name = name;
    }
    
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + 
                             " - " + name + " (" + i + ")");
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted: " + e.getMessage());
            }
        }
    }
}

public class RunnableDemo {
    public static void main(String[] args) {
        System.out.println("Main thread started");
        
        // Create Runnable instances
        NamePrinter task1 = new NamePrinter("Alice");
        NamePrinter task2 = new NamePrinter("Bob");
        
        // Create Thread objects with Runnable
        Thread thread1 = new Thread(task1, "Thread-Alice");
        Thread thread2 = new Thread(task2, "Thread-Bob");
        
        // Start threads
        thread1.start();
        thread2.start();
        
        // Using lambda (Java 8+)
        Thread thread3 = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println(Thread.currentThread().getName() + 
                                 " - Charlie (" + i + ")");
                try {
                    Thread.sleep(200);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "Thread-Charlie");
        thread3.start();
        
        // Wait for all threads
        try {
            thread1.join();
            thread2.join();
            thread3.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Main thread finished");
    }
}`,
          points: 5,
          difficulty: 'easy',
          keywords: ['Runnable', 'implements', 'run', 'Thread', 'start', 'lambda', 'join', 'constructor']
        },
        {
          id: 'q13',
          type: 'short',
          question: 'Create two threads and demonstrate concurrent execution.',
          sampleAnswer: `class Task implements Runnable {
    private String taskName;
    private int iterations;
    
    public Task(String taskName, int iterations) {
        this.taskName = taskName;
        this.iterations = iterations;
    }
    
    @Override
    public void run() {
        System.out.println(taskName + " started by " + 
                          Thread.currentThread().getName());
        
        for (int i = 1; i <= iterations; i++) {
            System.out.println(taskName + " - Step " + i + 
                             " [" + Thread.currentThread().getName() + "]");
            try {
                // Random sleep to show concurrent execution
                Thread.sleep((long)(Math.random() * 500));
            } catch (InterruptedException e) {
                System.out.println(taskName + " interrupted");
                return;
            }
        }
        
        System.out.println(taskName + " completed!");
    }
}

public class ConcurrentDemo {
    public static void main(String[] args) {
        System.out.println("=== Concurrent Execution Demo ===");
        System.out.println("Main thread: " + Thread.currentThread().getName());
        
        // Create tasks
        Task task1 = new Task("Download", 5);
        Task task2 = new Task("Upload", 5);
        
        // Create threads
        Thread thread1 = new Thread(task1, "Worker-1");
        Thread thread2 = new Thread(task2, "Worker-2");
        
        // Set thread priorities (optional)
        thread1.setPriority(Thread.MAX_PRIORITY);
        thread2.setPriority(Thread.MIN_PRIORITY);
        
        // Record start time
        long startTime = System.currentTimeMillis();
        
        // Start threads (concurrent execution)
        thread1.start();
        thread2.start();
        
        // Main thread continues
        System.out.println("Main thread continues while workers run...");
        
        // Wait for both threads to complete
        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // Calculate total time
        long endTime = System.currentTimeMillis();
        long totalTime = endTime - startTime;
        
        System.out.println("\\n=== Execution Complete ===");
        System.out.println("Total time: " + totalTime + "ms");
        System.out.println("Both tasks ran concurrently!");
        
        // Thread states demo
        demonstrateThreadStates();
    }
    
    static void demonstrateThreadStates() {
        System.out.println("\\n=== Thread States Demo ===");
        
        Thread thread = new Thread(() -> {
            System.out.println("Thread running");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        
        System.out.println("State after creation: " + thread.getState()); // NEW
        
        thread.start();
        System.out.println("State after start: " + thread.getState()); // RUNNABLE
        
        try {
            Thread.sleep(100);
            System.out.println("State while sleeping: " + thread.getState()); // TIMED_WAITING
            
            thread.join();
            System.out.println("State after completion: " + thread.getState()); // TERMINATED
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['concurrent', 'Thread', 'Runnable', 'start', 'join', 'execution', 'parallel', 'priority', 'state']
        }
      ]
    }
  ]
};