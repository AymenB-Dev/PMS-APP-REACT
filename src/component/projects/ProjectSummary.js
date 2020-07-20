import React from 'react';


const ProjectSummary = ({project}) => 
{
    
    return(
        <div className="col s12 m6">
            <div className="card center-align">
                <div className="card-content ">
                    <span className="card-title">{project.title}</span>
                </div>
            </div>
        </div>
    )
}

export default ProjectSummary;