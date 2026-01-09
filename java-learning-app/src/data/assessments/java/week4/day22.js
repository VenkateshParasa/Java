export const day22Assessment = {
  id: 'day22',
  title: 'Day 22: File I/O Basics',
  description: 'Assessment covering File class, reading and writing files, and basic file operations',
  duration: 30,
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'Which package contains the File class in Java?',
      options: [
        'java.util',
        'java.io',
        'java.file',
        'java.nio'
      ],
      correctAnswer: 1,
      points: 5,
      difficulty: 'easy',
      explanation: 'The File class is part of the java.io package, which provides classes for system input and output through data streams, serialization, and the file system.'
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'Which method is used to check if a file exists?',
      options: [
        'file.isExists()',
        'file.exists()',
        'file.checkExists()',
        'file.hasFile()'
      ],
      correctAnswer: 1,
      points: 5,
      difficulty: 'easy',
      explanation: 'The exists() method returns true if the file or directory denoted by this abstract pathname exists.'
    },
    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What does the following code do?\n\n```java\nFile file = new File("test.txt");\nfile.createNewFile();\n```',
      options: [
        'Always creates a new file',
        'Creates a new file only if it doesn\'t exist',
        'Deletes the existing file and creates a new one',
        'Throws an exception'
      ],
      correctAnswer: 1,
      points: 10,
      difficulty: 'medium',
      explanation: 'The createNewFile() method atomically creates a new, empty file named by this abstract pathname if and only if a file with this name does not yet exist.'
    },
    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'Which class is used to read character files in Java?',
      options: [
        'FileInputStream',
        'FileReader',
        'BufferedInputStream',
        'Scanner'
      ],
      correctAnswer: 1,
      points: 5,
      difficulty: 'easy',
      explanation: 'FileReader is a convenience class for reading character files. It extends InputStreamReader and is meant for reading streams of characters.'
    },
    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'Which class is used to write character files in Java?',
      options: [
        'FileOutputStream',
        'PrintStream',
        'FileWriter',
        'BufferedOutputStream'
      ],
      correctAnswer: 2,
      points: 5,
      difficulty: 'easy',
      explanation: 'FileWriter is a convenience class for writing character files. It extends OutputStreamWriter and is meant for writing streams of characters.'
    },
    {
      id: 'q6',
      type: 'code',
      question: 'Complete the code to read all lines from a file using BufferedReader:\n\n```java\nBufferedReader reader = new BufferedReader(new FileReader("data.txt"));\nString line;\nwhile ((line = reader.______()) != null) {\n    System.out.println(line);\n}\nreader.close();\n```',
      correctAnswer: 'readLine',
      points: 10,
      difficulty: 'medium',
      explanation: 'The readLine() method reads a line of text. A line is considered to be terminated by any one of a line feed (\\n), a carriage return (\\r), or a carriage return followed immediately by a linefeed.'
    },
    {
      id: 'q7',
      type: 'multiple-choice',
      question: 'What is the purpose of BufferedReader and BufferedWriter?',
      options: [
        'To encrypt file data',
        'To compress file data',
        'To improve I/O performance by buffering',
        'To convert between character encodings'
      ],
      correctAnswer: 2,
      points: 10,
      difficulty: 'medium',
      explanation: 'BufferedReader and BufferedWriter improve I/O performance by buffering characters, which reduces the number of I/O operations by reading/writing chunks of data at once.'
    },
    {
      id: 'q8',
      type: 'multiple-choice',
      question: 'Which method is used to delete a file in Java?',
      options: [
        'file.remove()',
        'file.delete()',
        'file.erase()',
        'file.clear()'
      ],
      correctAnswer: 1,
      points: 5,
      difficulty: 'easy',
      explanation: 'The delete() method deletes the file or directory denoted by this abstract pathname. Returns true if and only if the file or directory is successfully deleted.'
    },
    {
      id: 'q9',
      type: 'code',
      question: 'What will be the output of this code?\n\n```java\nFile file = new File("test.txt");\nSystem.out.println(file.isDirectory());\n```\n\nAssume test.txt is a regular file that exists.',
      correctAnswer: 'false',
      points: 10,
      difficulty: 'medium',
      explanation: 'The isDirectory() method returns true if and only if the file denoted by this abstract pathname exists AND is a directory. Since test.txt is a file, it returns false.'
    },
    {
      id: 'q10',
      type: 'multiple-choice',
      question: 'Which exception must be handled when working with file I/O?',
      options: [
        'FileException',
        'IOException',
        'FileNotFoundException',
        'Both IOException and FileNotFoundException'
      ],
      correctAnswer: 3,
      points: 10,
      difficulty: 'medium',
      explanation: 'File I/O operations can throw IOException (general I/O errors) and FileNotFoundException (when a file is not found). FileNotFoundException is a subclass of IOException.'
    },
    {
      id: 'q11',
      type: 'multiple-choice',
      question: 'What does the following code do?\n\n```java\nFile dir = new File("myFolder");\ndir.mkdir();\n```',
      options: [
        'Creates a file named myFolder',
        'Creates a directory named myFolder',
        'Deletes the directory myFolder',
        'Lists files in myFolder'
      ],
      correctAnswer: 1,
      points: 5,
      difficulty: 'easy',
      explanation: 'The mkdir() method creates the directory named by this abstract pathname. It creates a single directory, not including any necessary but nonexistent parent directories.'
    },
    {
      id: 'q12',
      type: 'code',
      question: 'Complete the code to write text to a file:\n\n```java\nFileWriter writer = new FileWriter("output.txt");\nwriter.______("Hello, World!");\nwriter.close();\n```',
      correctAnswer: 'write',
      points: 10,
      difficulty: 'medium',
      explanation: 'The write() method writes a string to the file. It\'s important to close the writer to ensure all data is flushed to the file.'
    },
    {
      id: 'q13',
      type: 'multiple-choice',
      question: 'What is the difference between FileReader and BufferedReader?',
      options: [
        'FileReader is faster',
        'BufferedReader provides buffering for efficient reading',
        'FileReader can read binary files',
        'There is no difference'
      ],
      correctAnswer: 1,
      points: 10,
      difficulty: 'medium',
      explanation: 'BufferedReader wraps around FileReader and provides buffering, which makes reading more efficient by reducing the number of I/O operations. It also provides the readLine() method.'
    },
    {
      id: 'q14',
      type: 'multiple-choice',
      question: 'Which method returns the absolute path of a file?',
      options: [
        'file.getPath()',
        'file.getAbsolutePath()',
        'file.getFullPath()',
        'file.getCompletePath()'
      ],
      correctAnswer: 1,
      points: 5,
      difficulty: 'easy',
      explanation: 'The getAbsolutePath() method returns the absolute pathname string of this abstract pathname.'
    },
    {
      id: 'q15',
      type: 'multiple-choice',
      question: 'What happens if you try to create a FileReader for a non-existent file?',
      options: [
        'It creates the file automatically',
        'It returns null',
        'It throws FileNotFoundException',
        'It returns an empty reader'
      ],
      correctAnswer: 2,
      points: 10,
      difficulty: 'medium',
      explanation: 'If the named file does not exist, is a directory rather than a regular file, or for some other reason cannot be opened for reading, FileNotFoundException is thrown.'
    },
    {
      id: 'q16',
      type: 'code',
      question: 'What is the output of this code?\n\n```java\nFile file = new File("data.txt");\nSystem.out.println(file.length());\n```\n\nAssume data.txt contains "Hello" (5 characters).',
      correctAnswer: '5',
      points: 10,
      difficulty: 'medium',
      explanation: 'The length() method returns the length of the file denoted by this abstract pathname in bytes. For a text file with 5 characters, it returns 5.'
    },
    {
      id: 'q17',
      type: 'multiple-choice',
      question: 'Which method is used to list all files in a directory?',
      options: [
        'dir.getFiles()',
        'dir.list()',
        'dir.listFiles()',
        'Both list() and listFiles()'
      ],
      correctAnswer: 3,
      points: 10,
      difficulty: 'medium',
      explanation: 'Both list() and listFiles() can be used to list files in a directory. list() returns an array of strings (file names), while listFiles() returns an array of File objects.'
    },
    {
      id: 'q18',
      type: 'multiple-choice',
      question: 'What is the purpose of the flush() method in file writing?',
      options: [
        'To delete the file',
        'To close the file',
        'To force any buffered output to be written',
        'To clear the file content'
      ],
      correctAnswer: 2,
      points: 10,
      difficulty: 'medium',
      explanation: 'The flush() method forces any buffered output bytes to be written out to the underlying output stream. This ensures that data is actually written to the file.'
    },
    {
      id: 'q19',
      type: 'code',
      question: 'Complete the code to check if a file is readable:\n\n```java\nFile file = new File("data.txt");\nif (file.______()) {\n    System.out.println("File is readable");\n}\n```',
      correctAnswer: 'canRead',
      points: 10,
      difficulty: 'medium',
      explanation: 'The canRead() method tests whether the application can read the file denoted by this abstract pathname. Returns true if and only if the file exists and can be read.'
    },
    {
      id: 'q20',
      type: 'multiple-choice',
      question: 'What is the recommended way to ensure a file is properly closed after use?',
      options: [
        'Call close() in the main method',
        'Use try-catch block',
        'Use try-with-resources statement',
        'Files close automatically'
      ],
      correctAnswer: 2,
      points: 10,
      difficulty: 'hard',
      explanation: 'The try-with-resources statement ensures that each resource (like a file) is closed at the end of the statement, even if an exception occurs. This is the recommended approach for resource management.'
    }
  ]
};