<script>
  import { ListItem } from 'svelte-materialify'
</script>

<style lang="scss">
  [data-placeholder] {
    width: 100%;
    height: 30px;
    background: rgba(179, 179, 179, 0.6);
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    &::after {
      content: ' ';
      box-shadow: 0 0 40px 9px rgba(254, 254, 254);
      position: absolute;
      top: 0;
      bottom: 0;
      left: -100%;
      animation: load 1s infinite;
    }
  }
  @keyframes load {
    0% {
      left: -100%;
    }
    100% {
      left: 150%;
    }
  }
  [circle] {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    max-width: 100%;
    max-height: 100%;
    clip-path: circle(100%);
  }
  [slot='append'] {
    display: flex;
    div {
      margin: 0 0.5rem;
    }
  }
</style>

<ListItem class="ma-0 pa-0">
  <div data-placeholder />
  <div slot="append">
    <div circle data-placeholder />
    <div circle data-placeholder />
  </div>

</ListItem>
