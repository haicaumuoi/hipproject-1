import { createSlice } from '@reduxjs/toolkit'

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        _id: '',
        End_Date: '', 
        Member_Amount: '',
        Post_Date: '',
        Project_Category: [],
        Project_Criteria: [],
        Project_Description: '',
        Project_Field: '',
        Project_Id: '',
        Project_Location: '',
        Project_Name: '',
        Project_Skill: '',
        User_Email: '',
        User_Id: '',
        User_Name: '',
        User_Password: '',
        User_University: '',
        category: [],
        criteria: [],
    },
    reducers: {
        addProject: (state, action) => {
            state._id = action.payload._id;
            state.End_Date = action.payload.End_Date;
            state.Member_Amount = action.payload.Member_Amount;
            state.Post_Date = action.payload.Post_Date;
            state.Project_Category = action.payload.Project_Category;
            state.Project_Criteria = action.payload.Project_Criteria;
            state.Project_Description = action.payload.Project_Description;
            state.Project_Field = action.payload.Project_Field;
            state.Project_Id = action.payload.Project_Id;
            state.Project_Location = action.payload.Project_Location;
            state.Project_Name = action.payload.Project_Name;
            state.Project_Skill = action.payload.Project_Skill;
            state.User_Email = action.payload.User_Email;
            state.User_Id = action.payload.User_Id;
            state.User_Name = action.payload.User_Name;
            state.User_Password = action.payload.User_Password;
            state.User_University = action.payload.User_University;
            state.category = action.payload.category;
            state.criteria = action.payload.criteria;
        }
    }
})