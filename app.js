import { of, map, filter, delay, concat, merge, pluck, mapTo } from "rxjs";

// EXAMPLE
const observable$ = of(1, 2, 3, 4, 5);
const subscription = observable$
  .pipe(
    map((item) => item * 2),
    filter((item) => item > 5)
  )
  .subscribe({
    next: (event) => console.log(event),
    error: (error) => console.log(error),
    complete: () => console.log("Completed..."),
  });
subscription.unsubscribe();

//--------------------------------------------------------------

const obs1$ = of({
  title: "Observable 1",
  content: "3 seconds delay",
}).pipe(delay(3000));

const obs2$ = of({
  title: "Observable 2",
  content: "2 seconds delay",
}).pipe(delay(2000));

const obs3$ = of({
  title: "Observable 3",
  content: "1 second delay",
}).pipe(delay(1000));

// MERGE: outputs the observables data depending on the completion time of each one. Does not follow the semantical order, but the 'completion time' order
merge(obs1$, obs2$, obs3$).subscribe((event) => console.log(event));

// CONCAT: waits for each observable to finish to continue with next one
concat(obs1$, obs2$, obs3$).subscribe((event) => console.log(event));

//--------------------------------------------------------------

// MAP: transforms an observable data source after applying the provided function
const numbers$ = of(1, 2, 3);
numbers$
  .pipe(map((number) => number * 10))
  .subscribe((event) => console.log(event));

// PLUCK: extracts a single property from an observable data source
const objects$ = of(
  {
    name: "Antxon",
    surname: "Eguiguren",
  },
  {
    name: "Julia",
    surname: "Viñas",
  },
  {
    name: "Manolo",
    surname: "Besada",
  }
);

objects$.pipe(pluck("name")).subscribe((event) => console.log(event));

// MAPTO: transforms the observables data source into a constant value observable
objects$.pipe(mapTo("Persona")).subscribe((event) => console.log(event));
