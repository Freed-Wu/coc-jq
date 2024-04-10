import { workspace, ExtensionContext, Thenable } from 'coc.nvim';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'coc.nvim';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	const serverOptions: ServerOptions = {
		run: {
			command: "jq-lsp",
			options: { env: process.env },
			transport: TransportKind.stdio
		},
		debug: {
			command: "jq-lsp",
			options: { env: Object.assign({}, process.env, { DEBUG: "1" }) },
			transport: TransportKind.stdio
		}
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'jq' }],
	};

	client = new LanguageClient(
		'jqlsp',
		'jq-lsp',
		serverOptions,
		clientOptions
	);

	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
