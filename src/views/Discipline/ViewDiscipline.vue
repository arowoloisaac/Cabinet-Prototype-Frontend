<template>
  <div class="subject-details">
    <!-- Title -->
    <h1>Mathematics</h1>

    <!-- Description -->
    <p>
      Advanced mathematics course covering algebra, calculus, and geometry
      concepts designed for higher-level education.
    </p>

    <!-- Literature List -->
    <h2>Literature List</h2>
    <ul>
      <li>Algebra by John Smith</li>
      <li>Calculus by Jane Doe</li>
      <li>Geometry Essentials by Emily Davis</li>
    </ul>

    <!-- Teachers -->
    <h2>Teachers</h2>
    <ul>
      <li>Prof. Alice Johnson</li>
      <li>Dr. Bob Williams</li>
    </ul>

    <!-- Schedule -->
    <h2>Schedule</h2>
    <ul>
      <li>
        <strong>Monday</strong>: First class at Building 1, Room 101
      </li>
      <li>
        <strong>Wednesday</strong>: Second class at Building 2, Room 202
      </li>
      <li>
        <strong>Friday</strong>: Online session (Zoom link provided)
      </li>
    </ul>

    <!-- Back Button -->
    <button @click="goBack">Back to Discipline List</button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      alert("Navigating back to the discipline list!");
      // In dynamic setup, use this.$router.push() to navigate
    },
  },
};
</script>

<style scoped>
/* Page Layout */
.subject-details {
  padding: 1rem;
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  border-radius: 10px;
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Title Styling */
.subject-details h1 {
  font-size: 2rem;
  color: #007bff;
  margin-bottom: 1rem;
}

/* Section Headings */
.subject-details h2 {
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #333;
}

/* Lists */
.subject-details ul {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
}

.subject-details li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.subject-details li:last-child {
  border-bottom: none;
}

/* Back Button */
.subject-details button {
  margin-top: 2rem;
  padding: 0.7rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.subject-details button:hover {
  background-color: #0056b3;
}
</style>
