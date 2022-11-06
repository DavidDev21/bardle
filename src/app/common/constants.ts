
export enum LetterState{
    PENDING, // not yet submitted / gray
    WRONG, // no match
    PARTIAL, //yellow, matching on letter, but not the position / vice versa
    CORRECT // full match on postioin and letter
}
/*
PENDING  = #0080FF
PARTIAL = #c9b458
WRONG = #787c7e
CORRECT = #6aaa64
*/
