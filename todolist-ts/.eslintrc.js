module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        //'@typescript-eslint/no-shadow': ['error'], //겹치는 이름
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
