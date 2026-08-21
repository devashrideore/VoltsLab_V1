from django.db import models


class Question(models.Model):
    TOPIC_CHOICES = [
        ('BASIC_ELECTRICAL', 'Basic Electrical'),
        ('CIRCUIT_THEORY', 'Circuit Theory'),
        ('ELECTRONICS_VLSI', 'Electronics and VLSI'),
        ('ELECTRICAL_MACHINES', 'Electrical Machines'),
        ('POWER_ELECTRONICS', 'Power Electronics'),
        ('RENEWABLE_ENERGY', 'Renewable Energy'),
        ('CONTROL_SYSTEMS', 'Control Systems'),
        ('EMBEDDED_IOT', 'Embedded and IoT'),
    ]

    PROBLEM_TYPE_CHOICES = [
        ('THEORY', 'Theory MCQ'),
        ('NUMERICAL', 'Numerical MCQ'),
    ]

    DIFFICULTY_CHOICES = [
        ('EASY', 'Easy'),
        ('MEDIUM', 'Medium'),
        ('HARD', 'Hard'),
    ]

    title = models.CharField(max_length=255)
    topic = models.CharField(max_length=30, choices=TOPIC_CHOICES)
    problem_type = models.CharField(max_length=10, choices=PROBLEM_TYPE_CHOICES)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)

    question_text = models.TextField(help_text='Supports LaTeX using $...$ or $$...$$')
    given_values = models.TextField(blank=True, default='', help_text='Optional given numerical values')

    option_a = models.CharField(max_length=255)
    option_b = models.CharField(max_length=255)
    option_c = models.CharField(max_length=255)
    option_d = models.CharField(max_length=255)
    correct_option = models.CharField(max_length=1, choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D')])

    explanation = models.TextField(help_text='Step-by-step solution derivation')
    formula_hint = models.TextField(blank=True, default='')

    points = models.PositiveIntegerField(default=10)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f'[{self.get_topic_display()}] {self.title}'

    def options_dict(self):
        return {
            'A': self.option_a,
            'B': self.option_b,
            'C': self.option_c,
            'D': self.option_d,
        }
