<template>
  <AddTask @add-task="addTask" v-show="showAddTask"></AddTask>
  <Tasks @delete-task="deleteTask" @toggle-reminder="toggleReminder" :tasks="tasks"></Tasks>
</template>

<script>
import Tasks from "@/components/Tasks";
import AddTask from "@/components/AddTask";

export default {
  name: "Home",
  components: {
    Tasks,
    AddTask
  },
  props: {
    showAddTask: Boolean
  },
  data() {
    return {
      tasks: [],
    }
  },
  methods: {
    async addTask(task) {
      const res = await fetch('api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task),
      })
      const data = await res.json()
      this.tasks = [...this.tasks, data]

    },
    async deleteTask(id) {
      if (confirm('Are you sure?')) {
        const res = await fetch(`api/tasks/${id}`, {
          method: 'DELETE'
        })
        res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert('Error delete task')
      }
    },
    async toggleReminder(id) {
      const taskToggle = await this.fetchTask(id)
      const updateTask = {...taskToggle, reminder: !taskToggle.reminder}
      const res = await fetch(`api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updateTask)
      })
      const data = await res.json()
      this.tasks = this.tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task)
    },
    async fetchTasks() {
      const res = await fetch('api/tasks')
      return res.json();
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`)
      return res.json();
    }
  },
  async created() {
    this.tasks = await this.fetchTasks()
  },
}
</script>

<style scoped>

</style>
