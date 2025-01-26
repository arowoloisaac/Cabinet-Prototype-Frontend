<template>
  <div class="schedule-page">
    <h1>Add Schedule Page</h1>

    <!-- Faculty Dropdown -->
     <div class="row">
        <div class="col-6">
            <label for="faculty">Faculty:</label>
    <select id="faculty" v-model="selectedFaculty">
      <option value="" disabled>Select Faculty</option>
      <option v-for="faculty in faculties" :key="faculty" :value="faculty">
        {{ faculty }}
      </option>
    </select>
        </div>
        <div class="col-6">
            <!-- Direction Dropdown -->
    <label for="direction">Direction:</label>
    <select id="direction" v-model="selectedDirection" :disabled="!selectedFaculty">
      <option value="" disabled>Select Direction</option>
      <option v-for="direction in directions" :key="direction" :value="direction">
        {{ direction }}
      </option>
    </select>
        </div>
        
     </div>
    

    

    <!-- Group Dropdown -->
    <label for="group">Group:</label>
    <select id="group" v-model="selectedGroup" :disabled="!selectedDirection">
      <option value="" disabled>Select Group</option>
      <option v-for="group in groups" :key="group" :value="group">
        {{ group }}
      </option>
    </select>

    <!-- Discipline Dropdown -->
    <label for="discipline">Discipline:</label>
    <select id="discipline" v-model="selectedDiscipline" :disabled="!selectedGroup">
      <option value="" disabled>Select Discipline</option>
      <option v-for="discipline in disciplines" :key="discipline" :value="discipline">
        {{ discipline }}
      </option>
    </select>

    <!-- Format Dropdown -->
    <label for="format">Format:</label>
    <select id="format" v-model="selectedFormat" :disabled="!selectedDiscipline">
      <option value="" disabled>Select Format</option>
      <option v-for="format in formats" :key="format" :value="format">
        {{ format }}
      </option>
    </select>

    <!-- Day of the Week Input -->
    <label for="day">Day of the Week:</label>
    <input
      id="day"
      v-model="dayOfWeek"
      placeholder="Enter day of the week (e.g., Monday)"
    />

    <!-- Display Button -->
    <button @click="displaySchedule">Display Schedule</button>

    <!-- Display Schedule -->
    <div v-if="showSchedule" class="schedule-display">
      <h2>Schedule Details</h2>
      <p><strong>Faculty:</strong> {{ selectedFaculty }}</p>
      <p><strong>Direction:</strong> {{ selectedDirection }}</p>
      <p><strong>Group:</strong> {{ selectedGroup }}</p>
      <p><strong>Discipline:</strong> {{ selectedDiscipline }}</p>
      <p><strong>Format:</strong> {{ selectedFormat }}</p>
      <p><strong>Day:</strong> {{ dayOfWeek }}</p>
    </div>
  </div>
</template>

---

### **Script**

```javascript
<script>
export default {
  data() {
    return {
      faculties: ["Faculty of Science", "Faculty of Arts", "Faculty of Engineering"],
      directions: ["Computer Science", "Mathematics", "Physics"],
      groups: ["Group A", "Group B", "Group C"],
      disciplines: ["Algebra", "Programming", "Data Structures"],
      formats: ["Online", "Offline"],
      selectedFaculty: "",
      selectedDirection: "",
      selectedGroup: "",
      selectedDiscipline: "",
      selectedFormat: "",
      dayOfWeek: "",
      showSchedule: false,
    };
  },
  methods: {
    displaySchedule() {
      if (
        this.selectedFaculty &&
        this.selectedDirection &&
        this.selectedGroup &&
        this.selectedDiscipline &&
        this.selectedFormat &&
        this.dayOfWeek
      ) {
        this.showSchedule = true;
      } else {
        alert("Please fill in all fields!");
      }
    },
  },
};
</script>

<style scoped>
.schedule-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #007bff;
}

label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}

select,
input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  margin-top: 1.5rem;
  padding: 0.7rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.schedule-display {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
