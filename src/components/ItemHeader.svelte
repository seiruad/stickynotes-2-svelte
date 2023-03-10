<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let id;
    export let title;

    const dispatch = createEventDispatcher();

    function fireEdit() {
        dispatch('edit', {
            id
        });
    }

    function handleEdit() {
        fireEdit();
    }
</script>

<main class="header">
    <div class="title">{title} </div>
    <div class="controls">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="20" width="20" fill="#625B71"><path d="m39.7 14.7-6.4-6.4 2.1-2.1q.85-.85 2.125-.825 1.275.025 2.125.875L41.8 8.4q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Z"/></svg> -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span 
            class="icon"
            on:click={handleEdit}        
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" fill="#625B71"><path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"/></svg>
        </span>
        <span 
            class="icon"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" fill="#B3261E"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"/></svg>
        </span>
    </div>
</main>

<style>
    .header {
        display: flex;
        font-weight: 700;
    }

    .title {
        width: 80%;
    }

    .controls {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 3rem;
        text-align: center;
    }

    .icon {
        padding: 2px;
        border-radius: var(--border-raius-one);
        transition: background .2s;
        margin-left: 1px;
    }

    .icon:hover {
        border-radius: var(--border-raius-one);
        background: rgba(0, 0, 0, .05);
    }

    svg {
        display: block;
        font-size: .5rem !important;
    }

</style>