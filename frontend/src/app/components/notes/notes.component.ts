import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService, Note } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notes',
  template: `
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h1>My Notes</h1>
        <button class="btn btn-secondary" (click)="logout()">Logout</button>
      </div>

      <div class="card">
        <h2>{{ editingNote ? 'Edit Note' : 'Add New Note' }}</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              [(ngModel)]="noteForm.title"
              required
              placeholder="Enter note title"
            />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              [(ngModel)]="noteForm.description"
              required
              placeholder="Enter note description"
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary">
            {{ editingNote ? 'Update Note' : 'Add Note' }}
          </button>
          <button *ngIf="editingNote" type="button" class="btn btn-secondary" (click)="cancelEdit()" style="margin-left: 10px;">
            Cancel
          </button>
        </form>
      </div>

      <div *ngIf="notes.length === 0" class="card" style="text-align: center; color: #666;">
        <p>No notes yet. Create your first note above!</p>
      </div>

      <div *ngIf="notes.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let note of notes">
              <td>{{ note.title }}</td>
              <td>{{ note.description }}</td>
              <td>{{ formatDate(note.createdAt) }}</td>
              <td>
                <button class="btn btn-primary" (click)="editNote(note)" style="margin-right: 5px;">
                  Edit
                </button>
                <button class="btn btn-danger" (click)="deleteNote(note._id!)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  noteForm = {
    title: '',
    description: ''
  };
  editingNote: Note | null = null;

  constructor(
    private notesService: NotesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.notesService.getNotes().subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (error) => {
        console.error('Error loading notes:', error);
        if (error.status === 401) {
          this.logout();
        }
      }
    });
  }

  onSubmit() {
    if (this.editingNote) {
      this.notesService.updateNote(this.editingNote._id!, this.noteForm).subscribe({
        next: () => {
          this.loadNotes();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error updating note:', error);
          alert('Failed to update note. Please try again.');
        }
      });
    } else {
      this.notesService.createNote(this.noteForm).subscribe({
        next: () => {
          this.loadNotes();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating note:', error);
          alert('Failed to create note. Please try again.');
        }
      });
    }
  }

  editNote(note: Note) {
    this.editingNote = note;
    this.noteForm = {
      title: note.title,
      description: note.description
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit() {
    this.editingNote = null;
    this.resetForm();
  }

  deleteNote(id: string) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.notesService.deleteNote(id).subscribe({
        next: () => {
          this.loadNotes();
        },
        error: (error) => {
          console.error('Error deleting note:', error);
          alert('Failed to delete note. Please try again.');
        }
      });
    }
  }

  resetForm() {
    this.noteForm = {
      title: '',
      description: ''
    };
    this.editingNote = null;
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

