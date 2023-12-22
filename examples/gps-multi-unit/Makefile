soralet_id ?= gps-multi-unit
soracom_profile ?= default
output = build/soralet-optimized.wasm

.PHONY: create-soralet
create-soralet:
	soracom --profile $(soracom_profile) soralets create --soralet-id $(soralet_id)

.PHONY: upload
upload:
	soracom --profile $(soracom_profile) soralets upload --soralet-id $(soralet_id) --content-type application/octet-stream --body @$(output)

payload = '{"bat":3,"humi":68.2,"lat":35.12345,"lon":139.12345,"rs":0,"temp":10.5,"type":0,"x":64.0,"y":-64.0,"z":1024.0}'

.PHONY: test
test:
	soracom --profile $(soracom_profile) soralets exec --soralet-id $(soralet_id) --version "\$$LATEST" --direction uplink --content-type "application/json" --payload $(payload) --body @test-uplink.json

.PHONY: log
log:
	soracom --profile $(soracom_profile) soralets get-logs --soralet-id $(soralet_id)
