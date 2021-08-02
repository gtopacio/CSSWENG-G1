import React from 'react'

export default function MyAccount(props) {

    return (
        <section style={{height:'83vh'}}>
            <div className="row justify-content-center mt-6 mb-1">
                <div className="col-9">
                    <h1 style={{fontSize:'130px'}}>
                        WELCOME BACK {props.user.firstName}!
                    </h1>
                </div>
            </div>
        </section>
    )
}
