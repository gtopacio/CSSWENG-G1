import React from 'react'

export default function AdminTable() {
    return (
        <Table id="requests" striped bordered hover>
        <thead>
            <tr>
                <th>Request ID</th>
                <th>Username</th>
                <th>Webinar Name</th>
                <th>Request Date</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>*Insert ID here*</td>
                <td>*Insert UN here*</td>
                <td>*Insert WN here*</td>
                <td>*Insert RD here*</td>
                <td>*Insert Status here*</td>
            </tr>
        </tbody>

    </Table>
    )
}
