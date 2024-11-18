import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Example dataset (replace with actual ciphertext data and labels)
data = [
    ("DA12", "AES"),
    ("DA1324", "RSA"),
    ("GH12", "DES"),
    ("KL65", "Blowfish"),
    # Add more samples...
]

# Convert dataset to DataFrame
df = pd.DataFrame(data, columns=['ciphertext', 'algorithm'])

# Feature Extraction using simple n-grams (as a placeholder for more advanced features)
vectorizer = CountVectorizer(analyzer='char', ngram_range=(2, 4))  # Bigrams and Trigrams
X = vectorizer.fit_transform(df['ciphertext']).toarray()
y = df['algorithm']

# Split dataset into training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy * 100:.2f}%")

# Example prediction on new cipher text
new_cipher_text = ["example_ciphertext"]
new_cipher_features = vectorizer.transform(new_cipher_text).toarray()
predicted_algorithm = model.predict(new_cipher_features)
print(f"Predicted Algorithm: {predicted_algorithm[0]}")
