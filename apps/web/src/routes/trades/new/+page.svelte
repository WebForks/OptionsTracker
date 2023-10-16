<script>
	import {
		Input,
		TextArea,
		Selection,
		TwoWayInput,
		TwoWayDateInput,
		NumberInput,
		TwoWayNumberInput
	} from '$lib/components';
	import { enhance } from '$app/forms';
	export let form;

	let warningMessage = '';

	let error = false;

	let issue_PUT_DEBIT_SPREAD = false;
	let issue_CALL_DEBIT_SPREAD = false;
	let issue_PUT_CREDIT_SPREAD = false;
	let issue_CALL_CREDIT_SPREAD = false;
	let issue_LONG_STRADDLE = false;
	let issue_SHORT_STRANGLE = false;
	let issue_SHORT_IRON_CONDOR = false;
	let issue_SHORT_IRON_BUTTERFLY = false;
	let issue_Expiration_Date = false;
	let issue_Quantity = false;
	let issue_Price_Filled = false;

	let symbolValue;
	let selectedType;
	let QuantityValue;
	let Short_Put_Strike_1Value;
	let Long_Put_Strike_1Value;
	let Short_Call_Strike_1Value;
	let Long_Call_Strike_1Value;
	let Expiration_DateValue;
	let Price_FilledValue;

	$: {
		if (selectedType == 'PUT DEBIT SPREAD' && Long_Put_Strike_1Value <= Short_Put_Strike_1Value) {
			issue_PUT_DEBIT_SPREAD = true;
			warningMessage =
				'Your Long Put Strike must be greater than your Short Put Strike for a PUT DEBIT SPREAD';
		} else {
			issue_PUT_DEBIT_SPREAD = false;
		}
		if (
			selectedType == 'CALL DEBIT SPREAD' &&
			Long_Call_Strike_1Value >= Short_Call_Strike_1Value
		) {
			issue_CALL_DEBIT_SPREAD = true;
			warningMessage =
				'Your Long Call Strike must be less than your Short Call Strike for a CALL DEBIT SPREAD';
		} else {
			issue_CALL_DEBIT_SPREAD = false;
		}

		if (selectedType == 'PUT CREDIT SPREAD' && Short_Put_Strike_1Value <= Long_Put_Strike_1Value) {
			issue_PUT_CREDIT_SPREAD = true;
			warningMessage =
				'Your Short Put Strike should be greater than your Long Put Strike for a PUT CREDIT SPREAD.';
		} else {
			issue_PUT_CREDIT_SPREAD = false;
		}

		if (
			selectedType == 'CALL CREDIT SPREAD' &&
			Short_Call_Strike_1Value >= Long_Call_Strike_1Value
		) {
			issue_CALL_CREDIT_SPREAD = true;
			warningMessage =
				'Your Short Call Strike should be less than your Long Call Strike for a CALL CREDIT SPREAD.';
		} else {
			issue_CALL_CREDIT_SPREAD = false;
		}

		if (selectedType == 'LONG STRADDLE' && Long_Call_Strike_1Value !== Long_Put_Strike_1Value) {
			issue_LONG_STRADDLE = true;
			warningMessage =
				'Your Long Call Strike must be the same as your Long Put Strike. If they are different you are doing a STRANGLE, not a STRADDLE.';
		} else {
			issue_LONG_STRADDLE = false;
		}

		if (selectedType == 'SHORT STRANGLE' && Short_Call_Strike_1Value == Short_Put_Strike_1Value) {
			issue_SHORT_STRANGLE = true;
			warningMessage =
				'Your Short Call Strike must be different than your Short Put Strike. If they are the same you are doing a STRADDLE, not a STRANGLE.';
		} else {
			issue_SHORT_STRANGLE = false;
		}

		if (selectedType == 'SHORT IRON CONDOR' && Short_Put_Strike_1Value <= Long_Put_Strike_1Value) {
			issue_SHORT_IRON_CONDOR = true;
			warningMessage =
				'Your Short Put Strike should be greater than your Long Put Strike for a SHORT IRON CONDOR.';
		} else if (
			selectedType == 'SHORT IRON CONDOR' &&
			Long_Call_Strike_1Value <= Short_Call_Strike_1Value
		) {
			issue_SHORT_IRON_CONDOR = true;
			warningMessage =
				'Your Short Call Strike should be less than your Long Call Strike for a SHORT IRON CONDOR.';
		} else {
			issue_SHORT_IRON_CONDOR = false;
		}

		if (
			selectedType == 'SHORT IRON BUTTERFLY' &&
			Short_Put_Strike_1Value <= Long_Put_Strike_1Value
		) {
			issue_SHORT_IRON_BUTTERFLY = true;
			warningMessage =
				'Your Short Put Strike should be greater than your Long Put Strike for a SHORT IRON BUTTERFLY.';
		} else if (
			selectedType == 'SHORT IRON BUTTERFLY' &&
			Long_Call_Strike_1Value <= Short_Call_Strike_1Value
		) {
			issue_SHORT_IRON_BUTTERFLY = true;
			warningMessage =
				'Your Short Call Strike should be less than your Long Call Strike for a SHORT IRON BUTTERFLY.';
		} else {
			issue_SHORT_IRON_BUTTERFLY = false;
		}

		if (
			(Expiration_DateValue == '' ||
				Expiration_DateValue == null ||
				Expiration_DateValue == undefined) &&
			selectedType !== 'BUY COMMON STOCK' &&
			selectedType !== 'SELL COMMON STOCK'
		) {
			issue_Expiration_Date = true;
		} else {
			issue_Expiration_Date = false;
		}

		if (
			QuantityValue == '' ||
			QuantityValue == null ||
			QuantityValue == undefined ||
			QuantityValue <= 0 ||
			isNaN(QuantityValue)
		) {
			issue_Quantity = true;
		} else {
			issue_Quantity = false;
		}

		if (
			Price_FilledValue == '' ||
			Price_FilledValue == null ||
			Price_FilledValue == undefined ||
			Price_FilledValue <= 0 ||
			isNaN(Price_FilledValue)
		) {
			issue_Price_Filled = true;
		} else {
			issue_Price_Filled = false;
		}

		error =
			issue_PUT_DEBIT_SPREAD ||
			issue_CALL_DEBIT_SPREAD ||
			issue_PUT_CREDIT_SPREAD ||
			issue_CALL_CREDIT_SPREAD ||
			issue_LONG_STRADDLE ||
			issue_SHORT_STRANGLE ||
			issue_SHORT_IRON_CONDOR ||
			issue_SHORT_IRON_BUTTERFLY ||
			issue_Expiration_Date ||
			issue_Quantity ||
			issue_Price_Filled;
	}

	$: {
		console.log('symbolValue:', symbolValue);
		console.log('selectedType:', selectedType);
		console.log('issue_PUT_DEBIT_SPREAD:', issue_PUT_DEBIT_SPREAD);
		console.log('issue_CALL_DEBIT_SPREAD:', issue_CALL_DEBIT_SPREAD);
		console.log('issue_PUT_CREDIT_SPREAD:', issue_PUT_CREDIT_SPREAD);
		console.log('issue_CALL_CREDIT_SPREAD:', issue_CALL_CREDIT_SPREAD);
		console.log('issue_LONG_STRADDLE:', issue_LONG_STRADDLE);
		console.log('issue_SHORT_STRANGLE:', issue_SHORT_STRANGLE);
		console.log('issue_SHORT_IRON_CONDOR:', issue_SHORT_IRON_CONDOR);
		console.log('issue_SHORT_IRON_BUTTERFLY:', issue_SHORT_IRON_BUTTERFLY);
		console.log('issue_Expiration_Date:', issue_Expiration_Date);
		console.log('issue_Quantity:', issue_Quantity);
		console.log('issue_Price_Filled:', issue_Price_Filled);
		console.log('error:', error);
	}

	$: if (form && form.data) {
		form.data.Symbol = symbolValue;
	}

	$: if (selectedType !== undefined && form?.data) {
		form.data.Type = selectedType;
	}
	$: if (QuantityValue !== undefined && form?.data) {
		form.data.Quantity = QuantityValue;
	}

	$: if (Short_Put_Strike_1Value !== undefined && form?.data) {
		form.data.Short_Put_Strike_1 = Short_Call_Strike_1Value;
	}
	$: if (Long_Put_Strike_1Value !== undefined && form?.data) {
		form.data.Long_Put_Strike_1 = Long_Put_Strike_1Value;
	}
	$: if (Short_Call_Strike_1Value !== undefined && form?.data) {
		form.data.Short_Call_Strike_1 = Short_Call_Strike_1Value;
	}
	$: if (Long_Call_Strike_1Value !== undefined && form?.data) {
		form.data.Long_Call_Strike_1 = Long_Call_Strike_1Value;
	}
	$: if (Expiration_DateValue !== undefined && form?.data) {
		form.data.Expiration_Date = Expiration_DateValue;
	}
	$: if (Price_FilledValue !== undefined && form?.data) {
		form.data.Price_Filled = Price_FilledValue;
	}
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			action="?/create"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance
		>
			<h2 class="text-2xl font-bold">Your New Trade</h2>
			<TwoWayInput
				id="Symbol"
				label="Symbol"
				bind:value={symbolValue}
				errors={form?.errors?.symbol}
			/>

			{#if symbolValue}
				<Selection
					id="Type"
					label=""
					bind:value={selectedType}
					options={[
						{ value: '', label: '' },
						{ value: 'BUY COMMON STOCK', label: 'Buy Common Stock' },
						{ value: 'SELL COMMON STOCK', label: 'Sell Common Stock' },
						{ value: 'LONG CALL', label: 'Long Call' },
						{ value: 'LONG PUT', label: 'Long Put' },
						{ value: 'CASH SECURED PUT', label: 'Cash Secured Put' },
						{ value: 'COVERED CALL', label: 'Covered Call' },
						{ value: 'PUT DEBIT SPREAD', label: 'Put Debit Spread' },
						{ value: 'CALL DEBIT SPREAD', label: 'Call Debit Spread' },
						{ value: 'PUT CREDIT SPREAD', label: 'Put Credit Spread' },
						{ value: 'CALL CREDIT SPREAD', label: 'Call Credit Spread' },
						{ value: 'LONG NAKED CALL', label: 'Long Naked Call' },
						{ value: 'LONG NAKED PUT', label: 'Long Naked Put' },
						{ value: 'SHORT NAKED CALL', label: 'Short Naked Call' },
						{ value: 'LONG STRANGLE', label: 'Long Strangle' },
						{ value: 'LONG STRADDLE', label: 'Long Straddle' },
						{ value: 'SHORT STRANGLE', label: 'Short Strangle' },
						{ value: 'SHORT STRADDLE', label: 'Short Straddle' },
						{ value: 'SHORT IRON CONDOR', label: 'Short Iron Condor' },
						{ value: 'BUTTERFLY CALL DEBIT SPREAD', label: 'Butterfly Call Debit Spread' },
						{ value: 'BUTTERFLY PUT DEBIT SPREAD', label: 'Butterfly Put Debit Spread' },
						{ value: 'BUTTERFLY CALL CREDIT SPREAD', label: 'Butterfly Call Credit Spread' },
						{ value: 'BUTTERFLY PUT CREDIT SPREAD', label: 'Butterfly Put Credit Spread' },
						{ value: 'SHORT IRON BUTTERFLY', label: 'Short Iron Butterfly' },
						{ value: 'JADE LIZZARD', label: 'Jade Lizzard' }
					]}
					errors={form?.errors?.Type}
				/>

				{#if selectedType && symbolValue}
					{#if selectedType !== 'BUY COMMON STOCK' && selectedType !== 'SELL COMMON STOCK'}
						<TwoWayDateInput
							id="Expiration_Date"
							label="Expiration"
							bind:value={Expiration_DateValue}
							errors={form?.errors?.Expiration_Date}
						/>
					{/if}

					{#if selectedType == 'LONG CALL'}
						<NumberInput
							id="Long_Call_Strike_1"
							label="Long Call Strike"
							min="0.01"
							value={form?.data?.Long_Call_Strike_1}
							errors={form?.errors?.Long_Call_Strike_1}
						/>
					{/if}

					{#if selectedType == 'LONG PUT'}
						<NumberInput
							id="Long_Put_Strike_1"
							label="Long Put Strike"
							min="0.01"
							value={form?.data?.Long_Put_Strike_1}
							errors={form?.errors?.Long_Put_Strike_1}
						/>
					{/if}

					{#if selectedType == 'CASH SECURED PUT'}
						<NumberInput
							id="Short_Put_Strike_1"
							label="Short Put Strike"
							min="0.01"
							value={form?.data?.Short_Put_Strike_1}
							errors={form?.errors?.Short_Put_Strike_1}
						/>
					{/if}

					{#if selectedType == 'COVERED CALL'}
						<NumberInput
							id="Short_Call_Strike_1"
							label="Short Call Strike"
							min="0.01"
							value={form?.data?.Short_Call_Strike_1}
							errors={form?.errors?.Short_Call_Strike_1}
						/>
					{/if}

					{#if selectedType == 'PUT DEBIT SPREAD'}
						<TwoWayNumberInput
							id="Long_Put_Strike_1"
							label="Long Put Strike"
							min="0.01"
							step="0.01"
							bind:value={Long_Put_Strike_1Value}
							errors={form?.errors?.Long_Put_Strike_1}
						/>
						<TwoWayNumberInput
							id="Short_Put_Strike_1"
							label="Short Put Strike"
							min="0.01"
							step="0.01"
							bind:value={Short_Put_Strike_1Value}
							errors={form?.errors?.Short_Put_Strike_1}
						/>

						{#if issue_PUT_DEBIT_SPREAD}
							<label for="PUT DEBIT SPREAD" class="label py-0 pt-1">
								<span class="label-text-alt text-error">
									{warningMessage}.<br />
								</span>
							</label>
						{/if}
					{/if}

					{#if selectedType == 'CALL DEBIT SPREAD'}
						<TwoWayNumberInput
							id="Long_Call_Strike_1"
							label="Long Call Strike"
							min="0.01"
							step="0.01"
							bind:value={Long_Call_Strike_1Value}
							errors={form?.errors?.Long_Call_Strike_1}
						/>
						<TwoWayNumberInput
							id="Short_Call_Strike_1"
							label="Short Call Strike"
							min="0.01"
							step="0.01"
							bind:value={Short_Call_Strike_1Value}
							errors={form?.errors?.Short_Call_Strike_1}
						/>

						{#if issue_CALL_DEBIT_SPREAD}
							<label for="CALL DEBIT SPREAD" class="label py-0 pt-1">
								<span class="label-text-alt text-error">
									{warningMessage}<br />
								</span>
							</label>
						{/if}
					{/if}

					{#if selectedType == 'PUT CREDIT SPREAD'}
						<TwoWayNumberInput
							id="Short_Put_Strike_1"
							label="Short Put Strike"
							min="0.01"
							bind:value={Short_Put_Strike_1Value}
							errors={form?.errors?.Short_Put_Strike_1}
						/>
						<TwoWayNumberInput
							id="Long_Put_Strike_1"
							label="Long Put Strike"
							min="0.01"
							bind:value={Long_Put_Strike_1Value}
							errors={form?.errors?.Long_Put_Strike_1}
						/>
						{#if issue_PUT_CREDIT_SPREAD}
							<label for="PUT CREDIT SPREAD" class="label py-0 pt-1">
								<span class="label-text-alt text-error">
									{warningMessage}<br />
								</span>
							</label>
						{/if}
					{/if}

					{#if selectedType == 'CALL CREDIT SPREAD'}
						<TwoWayNumberInput
							id="Short_Call_Strike_1"
							label="Short Call Strike"
							min="0.01"
							bind:value={Short_Call_Strike_1Value}
							errors={form?.errors?.Short_Call_Strike_1}
						/>
						<TwoWayNumberInput
							id="Long_Call_Strike_1"
							label="Long Call Strike"
							min="0.01"
							bind:value={Long_Call_Strike_1Value}
							errors={form?.errors?.Long_Call_Strike_1}
						/>
						{#if issue_CALL_CREDIT_SPREAD}
							<label for="CALL CREDIT SPREAD" class="label py-0 pt-1">
								<span class="label-text-alt text-error">
									{warningMessage}<br />
								</span>
							</label>
						{/if}
					{/if}

					{#if selectedType == 'LONG NAKED CALL'}
						<NumberInput
							id="Long_Call_Strike"
							label="Long Call Strike"
							min="0.01"
							value={form?.data?.Long_Call_Strike}
							errors={form?.errors?.Long_Call_Strike}
						/>
					{/if}

					{#if selectedType == 'LONG NAKED PUT'}
						<NumberInput
							id="Long_Put_Strike"
							label="Long Put Strike"
							min="0.01"
							value={form?.data?.Long_Put_Strike}
							errors={form?.errors?.Long_Put_Strike}
						/>
					{/if}

					{#if selectedType == 'SHORT NAKED CALL'}
						<NumberInput
							id="Short_Call_Strike"
							label="Short Call Strike"
							min="0.01"
							value={form?.data?.Short_Call_Strike}
							errors={form?.errors?.Short_Call_Strike}
						/>
					{/if}

					{#if selectedType == 'LONG STRANGLE'}
						<NumberInput
							id="Long_Put_Strike"
							label="Long Put Strike"
							min="0.01"
							value={form?.data?.Long_Put_Strike}
							errors={form?.errors?.Long_Put_Strike}
						/>
						<NumberInput
							id="Long_Call_Strike"
							label="Long Call Strike"
							min="0.01"
							value={form?.data?.Long_Call_Strike}
							errors={form?.errors?.Long_Call_Strike}
						/>
					{/if}

					{#if selectedType == 'LONG STRADDLE'}
						<TwoWayNumberInput
							id="Long_Put_Strike_1"
							label="Long Put Strike"
							min="0.01"
							bind:value={Long_Put_Strike_1Value}
							errors={form?.errors?.Long_Put_Strike}
						/>
						<TwoWayNumberInput
							id="Long_Call_Strike_1"
							label="Long Call Strike"
							min="0.01"
							bind:value={Long_Call_Strike_1Value}
							errors={form?.errors?.Long_Call_Strike}
						/>
						{#if issue_LONG_STRADDLE}
							<label for="LONG STRADDLE" class="label py-0 pt-1">
								<span class="label-text-alt text-error">
									{warningMessage}<br />
								</span>
							</label>
						{/if}
					{/if}

					{#if selectedType == 'SHORT STRANGLE'}
						<TwoWayNumberInput
							id="Short_Put_Strike_1"
							label="Short Put Strike"
							min="0.01"
							bind:value={Short_Put_Strike_1Value}
							errors={form?.errors?.Short_Put_Strike}
						/>
						<TwoWayNumberInput
							id="Short_Call_Strike_1"
							label="Short Call Strike"
							min="0.01"
							bind:value={Short_Call_Strike_1Value}
							errors={form?.errors?.Short_Call_Strike}
						/>
						{#if issue_SHORT_STRANGLE}
							<label for="SHORT STRANGLE" class="label py-0 pt-1">
								<span class="label-text-alt text-error">
									{warningMessage}<br />
								</span>
							</label>
						{/if}
					{/if}

					{#if selectedType == 'SHORT STRADDLE'}
						<NumberInput
							id="Short_Put_Strike"
							label="Short Put Strike"
							min="0.01"
							value={form?.data?.Short_Put_Strike}
							errors={form?.errors?.Short_Put_Strike}
						/>
						<NumberInput
							id="Short_Call_Strike"
							label="Short Call Strike"
							min="0.01"
							value={form?.data?.Short_Call_Strike}
							errors={form?.errors?.Short_Call_Strike}
						/>
					{/if}

					{#if selectedType == 'SHORT IRON CONDOR'}
						<TwoWayNumberInput
							id="Short_Put_Strike_1Value"
							label="Short Put Strike"
							min="0.01"
							bind:value={Short_Put_Strike_1Value}
							errors={form?.errors?.Short_Put_Strike}
						/>
						<TwoWayNumberInput
							id="Long_Put_Strike_1Value"
							label="Long Put Strike"
							min="0.01"
							bind:value={Long_Put_Strike_1Value}
							errors={form?.errors?.Long_Put_Strike}
						/>
						<TwoWayNumberInput
							id="Short_Call_Strike_1Value"
							label="Short Call Strike"
							min="0.01"
							bind:value={Short_Call_Strike_1Value}
							errors={form?.errors?.Short_Call_Strike}
						/>
						<TwoWayNumberInput
							id="Long_Call_Strike_1Value"
							label="Long Call Strike"
							min="0.01"
							bind:value={Long_Call_Strike_1Value}
							errors={form?.errors?.Long_Call_Strike}
						/>

						{#if issue_SHORT_IRON_CONDOR}
							<label for="SHORT IRON CONDOR" class="label py-0 pt-1">
								<span class="label-text-alt text-error">
									{warningMessage}<br />
								</span>
							</label>
						{/if}
					{/if}

					{#if selectedType == 'BUTTERFLY CALL DEBIT SPREAD'}
						<NumberInput
							id="Long_Call_Strike"
							label="Long Call Strike"
							min="0.01"
							value={form?.data?.Long_Call_Strike}
							errors={form?.errors?.Long_Call_Strike}
						/>
						<NumberInput
							id="Short_Call_Strike"
							label="Short Call Strike"
							min="0.01"
							value={form?.data?.Short_Call_Strike}
							errors={form?.errors?.Short_Call_Strike}
						/>
						<NumberInput
							id="Long_Call_Strike"
							label="Long Call Strike"
							min="0.01"
							value={form?.data?.Long_Call_Strike}
							errors={form?.errors?.Long_Call_Strike}
						/>
					{/if}

					{#if selectedType == 'BUTTERFLY PUT DEBIT SPREAD'}
						<NumberInput
							id="Long_Put_Strike"
							label="Long Put Strike"
							min="0.01"
							value={form?.data?.Long_Put_Strike}
							errors={form?.errors?.Long_Put_Strike}
						/>
						<NumberInput
							id="Short_Put_Strike"
							label="Short Put Strike"
							min="0.01"
							value={form?.data?.Short_Put_Strike}
							errors={form?.errors?.Short_Put_Strike}
						/>
						<NumberInput
							id="Long_Put_Strike"
							label="Long Put Strike"
							min="0.01"
							value={form?.data?.Long_Put_Strike}
							errors={form?.errors?.Long_Put_Strike}
						/>
					{/if}

					{#if selectedType == 'BUTTERFLY CALL CREDIT SPREAD'}
						<NumberInput
							id="Long_Call_Strike"
							label="Long Call Strike"
							min="0.01"
							value={form?.data?.Long_Call_Strike}
							errors={form?.errors?.Long_Call_Strike}
						/>
						<NumberInput
							id="Short_Call_Strike"
							label="Short Call Strike"
							min="0.01"
							value={form?.data?.Short_Call_Strike}
							errors={form?.errors?.Short_Call_Strike}
						/>
						<NumberInput
							id="Long_Call_Strike"
							label="Long Call Strike"
							min="0.01"
							value={form?.data?.Long_Call_Strike}
							errors={form?.errors?.Long_Call_Strike}
						/>
					{/if}

					{#if selectedType == 'BUTTERFLY PUT CREDIT SPREAD'}
						<NumberInput
							id="Long_Put_Strike"
							label="Long Put Strike"
							min="0.01"
							value={form?.data?.Long_Put_Strike}
							errors={form?.errors?.Long_Put_Strike}
						/>
						<NumberInput
							id="Short_Put_Strike"
							label="Short Put Strike"
							min="0.01"
							value={form?.data?.Short_Put_Strike}
							errors={form?.errors?.Short_Put_Strike}
						/>
						<NumberInput
							id="Long_Put_Strike"
							label="Long Put Strike"
							min="0.01"
							value={form?.data?.Long_Put_Strike}
							errors={form?.errors?.Long_Put_Strike}
						/>
					{/if}

					{#if selectedType == 'SHORT IRON BUTTERFLY'}
						<TwoWayNumberInput
							id="Long_Put_Strike_1"
							label="Long Put Strike"
							min="0.01"
							bind:value={Long_Put_Strike_1Value}
							errors={form?.errors?.Long_Put_Strike}
						/>
						<TwoWayNumberInput
							id="Short_Put_Strike_1"
							label="Short Put Strike"
							min="0.01"
							bind:value={Short_Put_Strike_1Value}
							errors={form?.errors?.Short_Put_Strike}
						/>
						<TwoWayNumberInput
							id="Short_Call_Strike_1"
							label="Short Call Strike"
							min="0.01"
							bind:value={Short_Call_Strike_1Value}
							errors={form?.errors?.Short_Call_Strike}
						/>
						<TwoWayNumberInput
							id="Long_Call_Strike_1"
							label="Long Call Strike"
							min="0.01"
							bind:value={Long_Call_Strike_1Value}
							errors={form?.errors?.Long_Call_Strike}
						/>

						{#if issue_SHORT_IRON_BUTTERFLY}
							<label for="SHORT IRON BUTTERFLY" class="label py-0 pt-1">
								<span class="label-text-alt text-error">
									{warningMessage}<br />
								</span>
							</label>
						{/if}
					{/if}

					{#if selectedType == 'JADE LIZZARD'}
						<NumberInput
							id="Short_Put_Strike"
							label="Short Put Strike"
							min="0.01"
							value={form?.data?.Short_Put_Strike}
							errors={form?.errors?.Short_Put_Strike}
						/>
						<NumberInput
							id="Short_Call_Strike"
							label="Short Call Strike"
							min="0.01"
							value={form?.data?.Short_Call_Strike}
							errors={form?.errors?.Short_Call_Strike}
						/>
						<NumberInput
							id="Long_Call_Strike"
							label="Long Call Strike"
							min="0.01"
							value={form?.data?.Long_Call_Strike}
							errors={form?.errors?.Long_Call_Strike}
						/>
					{/if}

					<TwoWayNumberInput
						id="Quantity"
						label="Quantity"
						min="1"
						step="1"
						bind:value={QuantityValue}
						errors={form?.errors?.Quantity}
					/>

					<TwoWayNumberInput
						id="Price_Filled"
						label="Price Filled"
						min="0.01"
						step="0.01"
						bind:value={Price_FilledValue}
						errors={form?.errors?.Price_Filled}
					/>

					<label for="Price_Filled" class="label py-0 pt-1">
						<span class="label-text-alt">
							Tip: Price Filled is the price filled for each contract type.<br />
							If you opened {QuantityValue}
							{selectedType}'s for .50 each (aka $50), you would enter .50 here not {0.5 *
								QuantityValue}.
						</span>
					</label>

					<TextArea
						id="Notes"
						label="Notes"
						value={form?.data?.Notes}
						errors={form?.errors?.Notes}
					/>
				{/if}
			{/if}

			<div class="w-full max-w-lg pt-3">
				<button
					type="submit"
					class="btn w-full max-w-lg {error ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'}"
					disabled={error}
				>
					Create Trade
				</button>
			</div>
		</form>
	</div>
</div>
