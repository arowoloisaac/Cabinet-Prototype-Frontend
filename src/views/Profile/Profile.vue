<script setup>

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-vue-ui-kit";
</script>


<template>
<MDBContainer className="py-5">
    <MDBRow>
    <MDBCol lg="10">
        <MDBCard className="mb-4">
        <MDBCardBody>
            <MDBRow>
            <MDBCol sm="3">
                <MDBCardText>Full Name</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
                <MDBCardText className="text-muted">
                Johnatan Smith
                </MDBCardText>
            </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
            <MDBCol sm="3">
                <MDBCardText>Email</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
                <MDBCardText className="text-muted">
                example@example.com
                </MDBCardText>
            </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
            <MDBCol sm="3">
                <MDBCardText>Phone</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
                <MDBCardText className="text-muted">
                (097) 234-5678
                </MDBCardText>
            </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
            <MDBCol sm="3">
                <MDBCardText>BirthDate</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
                <MDBCardText className="text-muted">
                27-11-2000
                </MDBCardText>
            </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
            <MDBCol sm="3">
                <MDBCardText>Password</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
                <MDBCardText className="text-muted">
                Bay Area, San Francisco, CA
                </MDBCardText>
            </MDBCol>
            </MDBRow>
        </MDBCardBody>
        </MDBCard>
    </MDBCol>
    </MDBRow>
    <button type="button">Edit Profile</Button>
</MDBContainer>
</template>