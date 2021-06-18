<template>
  <div class="container py-4">
    <h1 class="mb-4">Payment</h1>
    <h4 v-if="!supported">This feature is not supported on this device =(</h4>
    <div v-else>
      <button class="btn btn-primary" @click="request">Checkout</button>

      <div class="mt-4">
        <div v-if="success" class="text-success">
          <p>
            Payment Request success. Demo complete. No payment has been taken.
          </p>
        </div>
        <div v-if="error" class="text-danger">
          <p>
            The Payment Request API is unsupported or was cancelled or failed,
            so here we can proceed with our legacy web form (not implemented for
            this demo).
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supported: false,
      success: false,
      error: false,
    };
  },
  methods: {
    request() {
      if (window.ApplePaySession) {
        const request = {
          countryCode: "US",
          currencyCode: "USD",
          supportedNetworks: ["visa", "masterCard"],
          merchantCapabilities: ["supports3DS"],
          total: { label: "Total", amount: "1.00" },
        };
        const session = new window.ApplePaySession(1, request);
        session.begin();
      } else {
        const request = new PaymentRequest(
          this.buildSupportedPaymentMethodData(),
          this.buildShoppingCartDetails()
        );

        request
          .show()
          .then((paymentResponse) => {
            paymentResponse.complete("success").then(() => {
              this.success = true;
              this.error = false;
            });
          })
          .catch((e) => {
            console.log(e);
            this.success = false;
            this.error = true;
          });
      }
    },
    buildSupportedPaymentMethodData() {
      return [
        {
          supportedMethods: "basic-card",
          data: {
            supportedNetworks: ["visa", "mastercard"],
            supportedTypes: ["debit", "credit"],
          },
        },
      ];
    },
    buildShoppingCartDetails() {
      return {
        id: "order-123",
        displayItems: [
          {
            label: "Example item",
            amount: { currency: "USD", value: "1.00" },
          },
        ],
        total: {
          label: "Total",
          amount: { currency: "USD", value: "1.00" },
        },
      };
    },
  },
  created() {
    if (window.PaymentRequest || window.ApplePaySession) {
      this.supported = true;
    }
  },
};
</script>
