<script lang="ts">
    import { onMount } from 'svelte';
    import { apiClient } from '$lib/api';
    import type { PageData } from './$types';
    import type { ApiError } from '$lib/types';
    
    export let data: PageData;
    
    let message: string = data.initialMessage;
    let queryData: string = '';
    let health: string = data.initialHealth;
    let loading: boolean = false;
    let error: string = '';

    onMount((): void => {
        // クライアントサイドでのマウント時処理（必要に応じて）
        console.log('クライアントサイドでコンポーネントがマウントされました');
    });

    async function fetchData(): Promise<void> {
        try {
            loading = true;
            error = '';
            const result = await apiClient.getQueryData();
            queryData = `${result.data} (取得時刻: ${new Date(result.timestamp).toLocaleString()})`;
        } catch (err: unknown) {
            const apiError = err as ApiError;
            console.error('データ取得エラー:', apiError);
            error = 'データの取得に失敗しました';
        } finally {
            loading = false;
        }
    }

    async function refreshData(): Promise<void> {
        try {
            loading = true;
            error = '';
            const [helloWorldResult, healthResult] = await Promise.all([
                apiClient.getHelloWorld(),
                apiClient.getHealth()
            ]);
            
            message = helloWorldResult.message;
            health = `${healthResult.status} - ${healthResult.service}`;
        } catch (err: unknown) {
            const apiError = err as ApiError;
            console.error('データ更新エラー:', apiError);
            error = 'データの更新に失敗しました';
        } finally {
            loading = false;
        }
    }

    function handleDataButtonClick(event: MouseEvent): void {
        fetchData();
    }

    function handleRefreshClick(event: MouseEvent): void {
        refreshData();
    }
</script>

<svelte:head>
    <title>FastAPI + SvelteKit SSR App</title>
    <meta name="description" content="FastAPIバックエンドとSvelteKit SSRフロントエンドのサンプルアプリケーション" />
</svelte:head>

<div class="container">
    <h1>FastAPI + SvelteKit アプリ（SSR版）</h1>
    
    <div class="status-section">
        <h2>システム状態</h2>
        <p class="health">バックエンドステータス: {health}</p>
        <button on:click={handleRefreshClick} disabled={loading}>状態を更新</button>
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
            <h2>Hello World メッセージ（SSR）</h2>
            <p class="message">{message}</p>
            <p class="note">※このメッセージはサーバーサイドで事前に取得されました</p>
        </div>
        
        <div class="data-section">
            <h2>リアルタイムデータ取得</h2>
            <button on:click={handleDataButtonClick} disabled={loading}>最新データを取得</button>
            {#if queryData}
                <p class="data">{queryData}</p>
            {/if}
        </div>
    {/if}
</div>

<style>
    .container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    }

    h1 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 2rem;
        border-bottom: 2px solid #3498db;
        padding-bottom: 1rem;
    }

    h2 {
        color: #34495e;
        margin-bottom: 1rem;
    }

    .status-section, .message-section, .data-section, .error-section {
        margin: 2rem 0;
        padding: 1.5rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f8f9fa;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .error-section {
        border-color: #e74c3c;
        background-color: #fdf2f2;
    }

    .health {
        color: #27ae60;
        font-weight: bold;
        margin-bottom: 1rem;
        font-size: 1.1rem;
    }

    .message {
        color: #e74c3c;
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .note {
        color: #7f8c8d;
        font-style: italic;
        font-size: 0.9rem;
    }

    .data {
        color: #16a085;
        font-size: 1.1rem;
        margin-top: 1rem;
        padding: 1rem;
        background-color: #e8f8f5;
        border-radius: 4px;
        border-left: 4px solid #16a085;
    }

    .error {
        color: #c0392b;
        font-weight: bold;
    }

    .loading {
        text-align: center;
        color: #3498db;
        font-style: italic;
        font-size: 1.1rem;
    }

    button {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        transition: all 0.2s;
    }

    button:hover:not(:disabled) {
        background-color: #2980b9;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    button:active:not(:disabled) {
        transform: translateY(0);
    }

    button:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
        transform: none;
    }
</style>
