<template>
  <div class="discipline-page" style="padding: 2% 7% 3% 7%;">
    <!-- Top Bar -->
    <div class="category-bar">
      <button
        v-for="category in categories"
        :key="category"
        :class="['category-button', { active: category === selectedCategory }]"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <!-- List Section -->
    <div class="discipline-list">
      <h2>{{ selectedCategory }} Disciplines</h2>
      <ul>
        <li v-for="discipline in filteredDisciplines" :key="discipline.id">
          {{ discipline.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // List of categories for the bar
      categories: ["Autumn", "Spring", "Own Disciplines"],

      // The currently selected category
      selectedCategory: "Autumn",

      // Disciplines data
      disciplines: [
        { id: 1, name: "Mathematics", category: "Autumn" },
        { id: 2, name: "Physics", category: "Autumn" },
        { id: 3, name: "Biology", category: "Spring" },
        { id: 4, name: "Chemistry", category: "Spring" },
        { id: 5, name: "Philosophy", category: "Own Disciplines" },
        { id: 6, name: "History", category: "Own Disciplines" },
      ],
    };
  },
  computed: {
    // Filter disciplines based on the selected category
    filteredDisciplines() {
      return this.disciplines.filter(
        (discipline) => discipline.category === this.selectedCategory
      );
    },
  },
};
</script>

<style scoped>
/* General Page Styling */
.discipline-page {
  padding: 1rem;
  font-family: Arial, sans-serif;
}

/* Category Bar Styling */
.category-bar {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  background-color: #f8f8f8;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-button {
  border: none;
  background: transparent;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.category-button.active {
  background-color: #007bff;
  color: white;
}

.category-button:hover {
  background-color: #dceeff;
}

/* Discipline List Styling */
.discipline-list {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.discipline-list h2 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #333;
}

.discipline-list ul {
  list-style: none;
  padding: 0;
}

.discipline-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.discipline-list li:last-child {
  border-bottom: none;
}
</style>
