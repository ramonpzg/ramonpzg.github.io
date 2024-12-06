---
title: "Python Variables and Data Types"
description: "Learn about Python variables, data types, and basic operations"
section: "programming"
subsection: "python"
order: 2
duration: "45 minutes"
difficulty: "beginner"
topics: ["Python", "Variables", "Data Types"]
author: "Ramon Perez"
publishedDate: 2024-01-15
---

# Python Variables and Data Types

Let's explore Python's fundamental building blocks: variables and data types.

## Variables in Python

Variables are containers for storing data values. Python has no command for declaring a variable - a variable is created the moment you first assign a value to it.

```python
# Basic variable assignment
name = "Ramon"
age = 30
height = 1.75
is_programmer = True

# Python is dynamically typed
x = 100        # x is an integer
x = "hundred"  # now x is a string

# Multiple assignment
a, b, c = 1, 2, 3

print(f"Name: {name}, Age: {age}")
