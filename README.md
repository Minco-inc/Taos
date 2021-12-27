<h1><img src="icons/initial.png" alt="initialIcon" width="32px"> Taos Web Server</h1>
<img src="icons/full.jpg" alt="fullIcon">

## Installation
To install the Taos Web Server, execute one of these commands.
1. Automatic Install
```bash
wget -q -O - https://raw.githubusercontent.com/Minco-inc/Taos/master/install.sh | sudo bash
```
2. Manual Install
```bash
sudo npm i taos-setup -g
sudo taos-setup install
```

## Usage
To enable/disable the Taos Web Server, execute these commands.
- To enable
```bash
sudo taos start
```
- To disable
```bash
sudo taos stop
```
And... There're more things to do but... They are WIP!  
Peek:
1. Location of Taos Web Server is /etc/taos/.
2. All config files are in conf.d
3. For new config file, or if you're gonna  peer for config.js

## Uninstallation
**If you got any bugs, please [report](issues) us!**  
Or of course [discord server](https://www.minco.kro.kr) / [!                              !#0123](https://discord.com/users/590826711147347973)
```bash
sudo taos-setup uninstall
```
