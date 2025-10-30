<template>
     <div class="container my-4">
       <h3 class="fw-bold mb-3">Manage Books</h3>
   
       <div class="d-flex justify-content-between mb-3">
         <input type="text" class="form-control w-50" placeholder="Search books..." v-model="searchText" />
         <button class="btn btn-primary" @click="addBook">➕ Add Book</button>
       </div>
   
       <table class="table table-striped table-hover">
         <thead class="table-dark">
           <tr>
             <th>ID</th>
             <th>Title</th>
             <th>Publisher</th>
             <th>Available</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="book in filteredBooks" :key="book.id">
             <td>{{ book.id }}</td>
             <td>{{ book.title }}</td>
             <td>{{ book.publisher }}</td>
             <td>{{ book.available }}</td>
             <td>
               <button class="btn btn-sm btn-warning me-2" @click="editBook(book)">Edit</button>
               <button class="btn btn-sm btn-danger" @click="deleteBook(book.id)">Delete</button>
             </td>
           </tr>
         </tbody>
       </table>
     </div>
   </template>
   
   <script>
   export default {
     name: "AdminBookList",
     data() {
       return {
         searchText: "",
         books: [
           { id: 1, title: "Learning Vue.js", publisher: "O'Reilly", available: 5 },
           { id: 2, title: "JavaScript Patterns", publisher: "Apress", available: 3 },
         ],
       };
     },
     computed: {
       filteredBooks() {
         return this.books.filter(b =>
           b.title.toLowerCase().includes(this.searchText.toLowerCase())
         );
       },
     },
     methods: {
       addBook() {
         alert("Navigate to Add Book form");
       },
       editBook(book) {
         alert(`Edit book: ${book.title}`);
       },
       deleteBook(id) {
         if (confirm("Delete this book?")) {
           this.books = this.books.filter(b => b.id !== id);
         }
       },
     },
   };
   </script>
   