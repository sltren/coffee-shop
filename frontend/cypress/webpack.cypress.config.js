import path from 'path';

export const resolve = {
    extensions: ['.ts', '.js'],
};
export const module = {
    rules: [
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                },
            ],
        },
    ],
};