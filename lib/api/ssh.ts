const fs = require('fs')
const path = require('path')
const { NodeSSH } = require('node-ssh')
const credentials= require('../../credentials.js')
import stream from 'stream'
import { Client, ConnectConfig, ClientChannel, SFTPWrapper, ExecOptions, PseudoTtyOptions | ShellOptions } from 'ssh2';
import { Prompt, TransferOptions } from 'ssh2-streams';
declare type Config = ConnectConfig & {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  privateKeyPath?: string;
  privateKey?: string;
  passphrase?: string;
  tryKeyboard?: boolean;
  onKeyboardInteractive?: (
    name: string,
    instructions: string,
    lang: string,
    prompts: Prompt[],
    finish: (responses: string[]) => void
  ) => void;
};

const ssh = new NodeSSH()

ssh.connect({
  host: 'localhost',
  username: 'steel',
  privateKeyPath: '/home/steel/.ssh/id_rsa'
})
export async function Connect(config: Config) {
}