export class Person {
  constructor({
    id,
    name,
    profile_path,
    character,
    job,
    department,
    known_for_department,
  }) {
    this.id = id;
    this.name = name;
    this.profile = profile_path
      ? `https://image.tmdb.org/t/p/w500${profile_path}`
      : "https://placehold.co/300x450?text=No+Image";
    this.character = character || null;
    this.job = job || null; 
    this.department = department || known_for_department || "Unknown";
  }
}
