import { apiClient } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    try {
        // サーバーサイドで初期データを取得
        const [helloWorldResult, healthResult] = await Promise.all([
            apiClient.getHelloWorld(),
            apiClient.getHealth()
        ]);

        return {
            initialMessage: helloWorldResult.message,
            initialHealth: `${healthResult.status} - ${healthResult.service}`
        };
    } catch (error) {
        console.error('サーバーサイドでのデータ取得エラー:', error);
        
        return {
            initialMessage: 'サーバーサイドでのデータ取得に失敗しました',
            initialHealth: 'ヘルスチェック失敗'
        };
    }
};
