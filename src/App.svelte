<script lang="ts">
  import "sanitize.css";
  import "./global.css";
  import Button from "./components/Button.svelte";

  const onClick = () => console.log("clicked");
</script>

<main>
  <div class="container">
    <h1>Hello, World!</h1>
    <Button label="Shop Now" on:click={onClick} />
  </div>
</main>
