import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    students: [],
    filteredStudents: [],
    ratingFilters: {
        min_total: 0,
        min_science: 0,
        min_study: 0,
        min_community: 0,
        min_culture: 0,
        min_project: 0,
        min_sport: 0
    }
}

export const resumeSlice = createSlice({
    initialState,
    name: 'resumeSlice',
    reducers: {
        setStudentResumes(state, action) {
            state.students = action.payload
            state.filteredStudents = action.payload
        },
        setFilterRating(state, action) {
            const { total, science, study, community, culture, project, sport } = action.payload;

            state.filteredStudents = state.students.filter(student => {
                return student.total >= total &&
                    student.science >= science &&
                    student.study >= study &&
                    student.community >= community &&
                    student.culture >= culture &&
                    student.project >= project &&
                    student.sport >= sport;
            });
        },
        sortByLastName(state, action) {
            state.filteredStudents = state.filteredStudents.slice().sort((a, b) => {
                if (action.payload) {
                    return a.lastName.localeCompare(b.lastName);
                } else {
                    return b.lastName.localeCompare(a.lastName);
                }
            });
            // return a.total - b.total
        },
        sortByTotal(state, action) {
            state.filteredStudents = state.filteredStudents.slice().sort((a, b) => {
                if (action.payload) {
                    return a.total - b.total
                } else {
                    return b.total - a.total
                }
            });
        }
    },
})

export const {setStudentResumes, setFilterRating, sortByLastName, sortByTotal} = resumeSlice.actions;

export default resumeSlice.reducer