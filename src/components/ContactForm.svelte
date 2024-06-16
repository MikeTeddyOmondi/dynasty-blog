<script lang="ts" type="module">
  let email = "",
    name = "",
    subject = "",
    message = "";

  let errorMsg = "";
  let loading = false,
    success = false,
    error = false;

  const API =
    process.env.NODE_ENV === "production"
      ? "https://axum-todo-api.onrender.com"
      : "http://localhost:5050";

  async function sendMessage() {
    let response = await fetch(API);
    let data = response.json();
    return data;
  }

  async function submitContact() {
    // console.log({ name, email, subject, message });
    loading = true;

    if (email === "" || name === "" || subject === "" || message === "") {
      error = true;
      success = false;
      loading = false;
      errorMsg = "Please enter all fields!";
      return;
    }

    let response = await fetch(API);

    if (response.ok) {
      success = true;
      error = false;
      loading = false;

      setInterval(() => {
        success = false;
        error = false;
        loading = false;
        return;
      }, 5000);
    } else {
      error = true;
      loading = false;
      success = false;

      errorMsg = "Oops...Something went wrong!";
    }
  }
</script>

<form on:submit|preventDefault={submitContact} class="php-email-form">
  <div class="row">
    <div class="form-group col-md-6">
      <input
        type="text"
        name="name"
        class="form-control"
        id="name"
        placeholder="Your Name"
        bind:value={name}
        on:focus={() => (error = false)}
      />
    </div>
    <div class="form-group col-md-6">
      <input
        type="email"
        class="form-control"
        name="email"
        id="email"
        placeholder="Your Email"
        bind:value={email}
        on:focus={() => (error = false)}
      />
    </div>
  </div>
  <div class="form-group">
    <input
      type="text"
      class="form-control"
      name="subject"
      id="subject"
      placeholder="Subject"
      bind:value={subject}
      on:focus={() => (error = false)}
    />
  </div>
  <div class="form-group">
    <textarea
      class="form-control"
      name="message"
      rows="5"
      placeholder="Message"
      bind:value={message}
      on:focus={() => (error = false)}
    ></textarea>
  </div>
  <div class="my-3">
    {#if loading}
      <div class="loading d-block">Loading</div>
    {/if}
    {#if error}
      <div class="error-message d-block">{errorMsg}</div>
    {/if}
    {#if success}
      <div class="sent-message d-block">
        Your message has been sent. Thank you!
      </div>
    {/if}
  </div>
  <div class="text-center">
    <button type="submit">Send Message</button>
  </div>
</form>
