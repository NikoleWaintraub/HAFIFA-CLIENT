import React, { useState, useEffect } from 'react';

// export default function CourseItem(props){
export default function CourseItem({ course }) {
        return (
        <div className='listItem'>
            {course.name}
        </div>
    );
}