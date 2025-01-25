<template>
    <div class="create-discipline">
        <form class="row g-3">
  <div class="col-md-6">
    <label for="course-name" class="form-label">Course Name</label>
    <input  class="form-control" id="course-name">
  </div>
  <div class="col-md-6">
    <label for="year" class="form-label">Year</label>
    <input placeholder="2010 - 2011" class="form-control" id="year">
  </div>
  <div class="col-12">
    <label for="Description" class="form-label">Description</label>
    <textarea placeholder="write the description of the course here"class="form-control" id="Description" rows="3"></textarea>
  </div>
   <div class="col-12">
    <label for="Literature" class="form-label">Literature</label>
    <textarea placeholder="write the literature about the course here" class="form-control" id="Literature" rows="2"></textarea>
  </div> <div class="col-12">
    <label for="Reading" class="form-label">Reading</label>
    <textarea placeholder="write the reading about the course here" class="form-control" id="Reading" rows="2"></textarea>
  </div>
   
  <div class="col-md-6">
    <label for="Semester" class="form-label">Semester</label>
    <select id="Semester" class="form-select">
      <option disabled selected>Choose...</option>
      <option value="Autumn">Autumn</option>
      <option value="Spring">Spring</option>
    </select>
  </div>
  <div class="col-md-6">
    <label for="Semester" class="form-label">Teachers</label>
    <select id="Semester" class="form-select">
      <option disabled selected>Choose...</option>
      
      <option value="Autumn">Autumn</option>
      <option value="Spring">Spring</option>
    </select>
  </div>
 
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Create Discipline</button>
  </div>
</form>
    </div>
</template>


<style scoped lang="scss">
.create-discipline {
    padding-right: 80px;
    padding-top: 40px;
}
</style>