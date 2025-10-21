import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({});

const config: NextConfig = {
  devIndicators: false,
};

export default withNextIntl(config);
