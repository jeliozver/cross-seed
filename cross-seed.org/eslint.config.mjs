import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";

export default [
	{
		ignores: ["build/**", ".docusaurus/**", "node_modules/**"],
	},
	js.configs.recommended,
	{
		files: ["src/**/*.js"],
		...reactPlugin.configs.flat.recommended,
		languageOptions: {
			ecmaVersion: 2022,
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			sourceType: "module",
		},
		plugins: {
			react: reactPlugin,
		},
		rules: {
			...reactPlugin.configs.flat["jsx-runtime"].rules,
			"react/jsx-uses-vars": "error",
			"react/react-in-jsx-scope": "off",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		files: ["*.js"],
		languageOptions: {
			ecmaVersion: 2022,
			globals: globals.node,
			sourceType: "commonjs",
		},
	},
];
