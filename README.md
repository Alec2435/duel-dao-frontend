
# Duel Dao

## Set up the Dev environment

### Frontend
`yarn dev`

### Chain
compile (and get types):
`yarn hardhat compile`

run local node:
`yarn hardhat node`

deploy contract (after running node from another terminal):
`yarn hardhat --network localhost run scripts/testdep.ts`

### Local node endpoints:
RPC: http://127.0.0.1:8545/ 