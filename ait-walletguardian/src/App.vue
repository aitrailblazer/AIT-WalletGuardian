<script>
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import logo from "./assets/AIT-WalletGuardian.png";

export default {
  name: "UserWallet",

  data() {
    return {
      logoUrl: logo,
      sessionToken: null,
      userToken: null, // Added to store user token
      encryptionKey: null,
      requestOptions: "", // Add this line
      createUserResponse: null, // New data property for storing the create user response
      userId: "", // New data property for user ID
      createUserError: null, // New data property for storing the create user error message
      challengeId: null,
    };
  },

  methods: {
    generateIdempotencyKey() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },

    async handleUserCreation() {
      const url = "https://api.circle.com/v1/w3s/users/token";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`,
        },
        body: JSON.stringify({ userId: this.userId }),
      };
      this.requestOptions = url + ": " + JSON.stringify(options, null, 2);

      try {
        const res = await fetch(url, options);
        const json = await res.json();

        this.sessionToken = json;

        console.log("Session Token:", json);
        this.userToken = json.data.userToken;
        this.encryptionKey = json.data.encryptionKey;

        // Initialize the user account
        await this.initializeUserAccount();
      } catch (err) {
        console.error("Error:", err);
      }
    },

    async initializeUserAccount() {
      const idempotencyKey = this.generateIdempotencyKey(); // Generate key
      console.log("this.userToken:", this.userToken);

      const url = "/api/v1/w3s/user/initialize";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`,
          "X-User-Token": this.userToken,
        },
        body: JSON.stringify({
          blockchains: ["ETH-GOERLI"],
          idempotencyKey: idempotencyKey,
        }),
      };
      this.requestOptions = url + ": " + JSON.stringify(options, null, 2);

      // Log the options object
      console.log("Request Options:", JSON.stringify(options, null, 2));

      try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if (json && json.data && json.data.challengeId) {
          this.challengeId = json.data.challengeId;
          console.log("Challenge ID:", this.challengeId);

          await this.executeChallenge();
        }
      } catch (err) {
        console.error("Error:", err);
      }
    },

    async createUser() {
      const url = "https://api.circle.com/v1/w3s/users";

      this.createUserError = "";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`,
        },
        body: JSON.stringify({ userId: this.userId }),
      };
      this.requestOptions = url + ": " + JSON.stringify(options, null, 2);

      try {
        const res = await fetch(url, options);
        const json = await res.json();

        if (res.ok) {
          console.log("Create User Response:", json);
          this.createUserResponse = json;

          await this.handleUserCreation();
        } else {
          // Error handling based on status code or response
          if (json.code === 155101) {
            this.createUserError =
              "A user with this ID already exists. Please use a different ID.";
          } else {
            this.createUserError = `Error: ${json.message}`;
          }
        }
      } catch (err) {
        console.error("Network or other error:", err);
      }
    },

    async executeChallenge() {
      // Initialize the SDK
      const sdk = new W3SSdk();

      sdk.setAppSettings({
        appId: process.env.VUE_APP_APP_ID, // Replace with your actual App ID
      });

      sdk.setAuthentication({
        userToken: this.userToken, // Use the user token from your data
        encryptionKey: this.encryptionKey, // Replace with your actual encryption key
      });

      // Execute the challenge
      sdk.execute(this.challengeId, (error, result) => {
        if (error) {
          console.error(
            `${error?.code?.toString() || "Unknown code"}: ${
              error?.message ?? "Error!"
            }`
          );
          return;
        }

        console.log(`Challenge: ${result.type}`);
        console.log(`status: ${result.status}`);

        if (result.data) {
          console.log(`signature: ${result.data?.signature}`);
        }
      });
    },
  },
};
</script>

<template>
  <div id="app" class="container py-5">
    <div class="d-flex justify-content-center">
      <div class="text-center" style="max-width: 600px">
        <h1 class="h3 mb-3 font-weight-normal">AIT-WalletGuardian</h1>
        <img
          :src="logoUrl"
          alt="AIT-WalletGuardian Logo"
          class="mb-4"
          style="width: 100px; height: auto"
        />
        <div class="form-group">
          <input
            type="text"
            v-model="userId"
            class="form-control"
            placeholder="Enter User ID"
          />
        </div>
        <button
          @click="createUser"
          :disabled="!userId"
          class="btn btn-lg btn-primary btn-block"
        >
          Create New User
        </button>
        <div v-if="createUserError" class="alert alert-danger mt-3">
          {{ createUserError }}
        </div>
      </div>
    </div>
  </div>
  <!-- 
    <div v-if="requestOptions">
      <h2>Request Options:</h2>
      <pre>{{ requestOptions }}</pre>
    </div>
    <div v-if="createUserResponse">
      <h2>Create User Response:</h2>
      <pre>{{ createUserResponse }}</pre>
    </div>

    <div v-if="sessionToken">
      <h2>Session Token:</h2>
      <p>{{ sessionToken }}</p>
    </div>
    <div v-if="userToken">
      <h2>User Token:</h2>
      <p>{{ userToken }}</p>
    </div>
    -->
</template>

<style>
.error-message {
  color: red;
  margin-top: 10px;
}

/* Custom styles here */
.form-group {
  margin-bottom: 20px;
}

.btn-block {
  max-width: 300px; /* Adjust the width of the button */
  margin: 0 auto 20px; /* Center the button horizontally and add margin at the bottom */
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
