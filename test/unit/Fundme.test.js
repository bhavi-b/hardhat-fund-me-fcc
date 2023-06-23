const { deployments, ethers, getNamedAccounts, network } = require("hardhat")
const { assert, expect } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let deployer
          let mockV3Aggregator
          let sendValue = ethers.utils.parseEther("1")
          beforeEach(async function () {
              // deploy using hardhat
              // const accounts = await ethers.getSigners()
              // const accountZero = accounts[0]
              const { deployer } = await getNamedAccounts()
              await deployments.fixture(["all"])
              fundMe = await ethers.getContract("FundMe", deployer)
              mockV3Aggregator = await ethers.getContract(
                  "MockV3Aggregator",
                  deployer
              )
          })
          describe("constructor", async function () {
              it("sets the aggregator addresses correctly", async function () {
                  const response = await fundMe.getPriceFeed()
                  assert.equal(response, mockV3Aggregator.address)
              })
          })

          describe("fund", async function () {
              it("fails if you don't send enough ETH", async function () {
                  await expect(fundMe.fund()).to.be.reverted
              })

              // it("updates the amount funded data structure", async function () {
              //     await fundMe.fund({ value: sendValue })
              //     const response = await fundMe.addresstoAmountFunded(deployer)
              //     assert.equal(response.toString(), sendValue.toString())
              // })

              // it("adds funder to the array of funders", async function () {
              //     await fundMe.fund({ value: sendValue })
              //     const funder = await fundMe.funders(0)
              //     assert.equal(funder, deployer)
              // })
          })
      })
