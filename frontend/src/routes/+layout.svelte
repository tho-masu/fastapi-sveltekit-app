<script lang="ts">
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;
</script>

<div class="app">
    <header>
        <nav>
            <h1>FastAPI + SvelteKit App (SSR)</h1>
        </nav>
    </header>
    
    <main>
        <slot />
    </main>
    
    <footer>
        <p>&copy; 2025 FastAPI + SvelteKit SSRアプリケーション</p>
    </footer>
</div>

<style>
    .app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    
    header {
        background-color: #2c3e50;
        color: white;
        padding: 1rem;
    }
    
    nav h1 {
        margin: 0;
        text-align: center;
    }
    
    main {
        flex: 1;
        padding: 2rem;
        max-width: 900px;
        margin: 0 auto;
        width: 100%;
    }
    
    footer {
        background-color: #34495e;
        color: white;
        padding: 1rem;
        text-align: center;
    }
    
    footer p {
        margin: 0;
    }
</style>
