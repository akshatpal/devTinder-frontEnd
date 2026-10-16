import React from 'react'

const UserCard = ({user}) => {
    return (
        <div>
            <div className="card bg-base-200 w-96 shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
                    <p>{user?.age}</p>
                    <div className="card-actions justify-between">
                        <button className="btn btn-primary">Ignore</button>
                        <button className="btn btn-secondary">Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard 