<template>
  <div class="container py-4">
    <h1 class="mb-4">Contacts</h1>
    <h4 v-if="!supported">This feature is not supported on this device =(</h4>
    <div v-else>
      <button class="btn btn-primary" @click="selectContacts">
        Select contacts
      </button>
      <div class="mt-4">
        <div v-for="(contact, index) in contacts" :key="index" class="mt-4">
          <div>
            <h5>{{ contact.name[0] || "Unknown" }}</h5>
          </div>
          <div><b>Email</b>: {{ contact.email[0] || "-" }}</div>
          <div><b>Tel</b>: {{ contact.tel[0] || "-" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supported: true,
      contacts: [],
    };
  },
  methods: {
    async selectContacts() {
      this.contacts = await navigator.contacts.select(
        ["name", "email", "tel"],
        {
          multiple: true,
        }
      );
    },
  },
  created() {
    if (!navigator.contacts) {
      this.supported = false;
    }
  },
};
</script>
