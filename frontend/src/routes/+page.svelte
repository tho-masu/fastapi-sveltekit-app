<script lang="ts">
    import { onMount } from 'svelte';
    import { apiClient } from '$lib/api';
    import type { ApiError } from '$lib/types';
    
    let message: string = '';
    let data: string = '';
    let health: string = '';
    let loading: boolean = false;
    let error: string = '';

    onMount(async (): Promise<void> => {
        await fetchHelloWorld();
        await fetchHealth();
    });

    async function fetchHelloWorld(): Promise<void> {
        try {
            loading = true;
            error = '';
            const result = await apiClient.getHelloWorld();
            message = result.message;
        } catch (err: unknown) {
            const apiError = err as ApiError;
            console.error('Hello World取得エラー:', apiError);
            error = 'Hello Worldメッセージの取得に失敗しました';
        } finally {
            loading = false;
        }
    }

    async function fetchData(): Promise<void> {
        try {
            loading = true;
            error = '';
            const result = await apiClient.getQueryData();
            data = `${result.data} (取得時刻: ${new Date(result.timestamp).toLocaleString()})`;
        } catch (err: unknown) {
            const apiError = err as ApiError;
            console.error('データ取得エラー:', apiError);
            error = 'データの取得に失敗しました';
        } finally {
            loading = false;
        }
    }

    async function fetchHealth(): Promise<void> {
        try {
            const result = await apiClient.getHealth();
            health = `${result.status} - ${result.service}`;
        } catch (err: unknown) {
            console.error('ヘルスチェックエラー:', err);
            health = 'ヘルスチェック失敗';
        }
    }

    function handleDataButtonClick(event: MouseEvent): void {
        fetchData();
    }

    function handleRefreshClick(event: MouseEvent): void {
        fetchHelloWorld();
        fetchHealth();
    }
</script>

<main>
    <h1>FastAPI + SvelteKit アプリ（TypeScript版）</h1>
    
    <div class="status-section">
        <h2>システム状態</h2>
        <p class="health">バックエンドステータス: {health}</p>
        <button on:click={handleRefreshClick}>状態を更新</button>
    </div>

    {#if error}
        <div class="error-section">
            <p class="error">{error}</p>
        </div>
    {/if}
    
    {#if loading}
        <p class="loading">読み込み中...</p>
    {:else}
        <div class="message-section">
            <h2>Hello World メッセージ</h2>
            <p class="message">{message}</p>
        </div>
        
        <div class="data-section">
            <h2>データ取得</h2>
            <button on:click={handleDataButtonClick}>最新データを取得</button>
            {#if data}
                <p class="data">{data}</p>
            {/if}
        </div>
    {/if}
</main>

<style>
    main {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    }

    h1 {
        color: #333;
        text-align: center;
        margin-bottom: 2rem;
    }

    h2 {
        color: #555;
        margin-bottom: 1rem;
    }

    .status-section, .message-section, .data-section, .error-section {
        margin: 2rem 0;
        padding: 1.5rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    .error-section {
        border-color: #ff6b6b;
        background-color: #ffe6e6;
    }

    .health {
        color: #28a745;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .message {
        color: #ff6b6b;
        font-size: 1.2rem;
        font-weight: bold;
    }

    .data {
        color: #4ecdc4;
        font-size: 1.1rem;
        margin-top: 1rem;
        padding: 0.5rem;
        background-color: #e8f8f7;
        border-radius: 4px;
    }

    .error {
        color: #dc3545;
        font-weight: bold;
    }

    .loading {
        text-align: center;
        color: #007bff;
        font-style: italic;
    }

    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        transition: background-color 0.2s;
    }

    button:hover {
        background-color: #0056b3;
    }

    button:active {
        transform: translateY(1px);
    }
</style>
