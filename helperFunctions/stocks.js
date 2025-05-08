import hose_collar_category_image from "Apps/ghp/GHPAssets/images/stocks/hose_collar.jpg";
import hose_collar_4w_category_image from "Apps/ghp/GHPAssets/images/stocks/hose_collar_4w.jpg";
// import hose_collar_1w_category_image from "Apps/ghp/GHPAssets/images/stocks/hose_collar_1w.jpg";
import hydraulic_hose_category_image from "Apps/ghp/GHPAssets/images/stocks/hydraulic_hose.jpg";
import hydraulic_hose_1wire_image from "Apps/ghp/GHPAssets/images/stocks/hydraulic_hose_1wire.jpg";
import hydraulic_hose_4wire_image from "Apps/ghp/GHPAssets/images/stocks/hydraulic_hose_4wire.jpg";
import blank_tail_product_image from "Apps/ghp/GHPAssets/images/stocks/blank_tails.jpg";
import multipurpose_hose_category_image from "Apps/ghp/GHPAssets/images/stocks/multipurpose_hose.jpg";
import radiator_hose_category_image from "Apps/ghp/GHPAssets/images/stocks/radiator_hose.jpg";
import hydraulic_steel_sleeves_product_image from "Apps/ghp/GHPAssets/images/stocks/steel_sleeves.jpg";
import bsp_fitting from "Apps/ghp/GHPAssets/images/stocks/bsp_fitting.jpg";
import bsp_45deg_fitting from "Apps/ghp/GHPAssets/images/stocks/bsp_45deg_fitting.jpg";
import bsp_90deg_fitting from "Apps/ghp/GHPAssets/images/stocks/bsp_90deg_fitting.jpg";
import jic_fitting from "Apps/ghp/GHPAssets/images/stocks/jic_fitting.jpg";
import jic_45deg_fitting from "Apps/ghp/GHPAssets/images/stocks/jic_45deg_fitting.jpg";
import jic_90deg_fitting from "Apps/ghp/GHPAssets/images/stocks/jic_90deg_fitting.jpg";
import radiator_hose_l_shape from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/l_shape.jpg";
import radiator_hose_straight from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/straight.jpg";
import radiator_hose_t_shape from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/t_shape.jpg";
import radiator_hose_u_shape from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/u_shape.jpg";
import radiator_hose_v_shape from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/v_shape.jpg";
// import radiator_hose_y_shape from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/y_shape.jpg";
import radiator_hose_z_shape from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/z_shape.jpg";
import radiator_hose_double_curve from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/double_curve.jpg";
import radiator_hose_c_shape from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/c_shape.jpg";
import radiator_hose_s_shape from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/s_shape.jpg";
import radiator_hose_elbow from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/elbow.jpg";
import radiator_hose_flexible from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/flexible.jpg";
import radiator_hose_reducer from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/reducer.jpg";
import radiator_hose_j_shape from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/j_shape.jpg";
import radiator_hose_multi_angle from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/multi_angle.jpg";
// import radiator_hose_multi_branch from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/multi_branch.jpg";
import radiator_hose_offset from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/offset.jpg";
import radiator_hose_wave from "Apps/ghp/GHPAssets/images/stocks/radiator_hoses/wave.jpg";
import pneumatic_tube_transparent from "Apps/ghp/GHPAssets/images/stocks/pneumatic_tubes/pneumatic_tube_transparent.jpg";
import pneumatic_tube_blue from "Apps/ghp/GHPAssets/images/stocks/pneumatic_tubes/pneumatic_tube_blue.jpg";
import pneumatic_tube_black from "Apps/ghp/GHPAssets/images/stocks/pneumatic_tubes/pneumatic_tube_black.jpg";
import pneumatic_tube_yellow from "Apps/ghp/GHPAssets/images/stocks/pneumatic_tubes/pneumatic_tube_yellow.jpg";
import pneumatic_tube_red from "Apps/ghp/GHPAssets/images/stocks/pneumatic_tubes/pneumatic_tube_red.jpg";
import pneumatic_tube_green from "Apps/ghp/GHPAssets/images/stocks/pneumatic_tubes/pneumatic_tube_green.jpg";
import pneumatic_tube_orange from "Apps/ghp/GHPAssets/images/stocks/pneumatic_tubes/pneumatic_tube_orange.jpg";
import hose_joiner_product_image from "Apps/ghp/GHPAssets/images/stocks/hose_joiner.jpg";

export const getStockProductImage = (stockItem, productid, categoryId) => {
  if (!productid) productid = stockItem.product?.id;
  if (!categoryId) categoryId = stockItem.category?.id;

  var specifications = stockItem.specifications;
  if (productid == "one_wire_hose") return hydraulic_hose_1wire_image;
  if (productid == "two_wire_hose") return hydraulic_hose_category_image;
  if (productid == "four_wire_hose") return hydraulic_hose_4wire_image;
  if (productid == "six_wire_hose") return hydraulic_hose_category_image;
  if (productid == "steel_tube_collars")
    return hydraulic_steel_sleeves_product_image;

  if (productid == "two_wire_hose_collars") return hose_collar_category_image;
  if (productid == "four_wire_hose_collars")
    return hose_collar_4w_category_image;
  // if (productid == "one_wire_hose_collars") return hose_collar_1w_category_image;
  if (productid == "fitting_tails") return blank_tail_product_image;
  if (productid == "hose_joiners") return hose_joiner_product_image;
  if (productid == "radiator_hoses") return radiator_hose_category_image;
  if (productid == "multipurpose_hose") return multipurpose_hose_category_image;
  if (categoryId == "tubes") {
    try {
      if (specifications.color.id == "transparent")
        return pneumatic_tube_transparent;
      if (specifications.color.id == "blue") return pneumatic_tube_blue;
      if (specifications.color.id == "black") return pneumatic_tube_black;
      if (specifications.color.id == "yellow") return pneumatic_tube_yellow;
      if (specifications.color.id == "red") return pneumatic_tube_red;
      if (specifications.color.id == "green") return pneumatic_tube_green;
      if (specifications.color.id == "orange") return pneumatic_tube_orange;
    } catch (error) {}
  }
  if (productid == "radiator_hose") {
    try {
      if (specifications.shape.code == "STRAIGHT")
        return radiator_hose_straight;
      if (specifications.shape.code == "REDUCER") return radiator_hose_reducer;
      if (specifications.shape.code == "ELBOW") return radiator_hose_elbow;
      if (specifications.shape.code == "LSHAPE") return radiator_hose_l_shape;
      if (specifications.shape.code == "CSHAPE") return radiator_hose_c_shape;
      if (specifications.shape.code == "DOUBLE_CURVE")
        return radiator_hose_double_curve;
      if (specifications.shape.code == "SSHAPE") return radiator_hose_s_shape;
      if (specifications.shape.code == "ZSHAPE") return radiator_hose_z_shape;
      if (specifications.shape.code == "USHAPE") return radiator_hose_u_shape;
      if (specifications.shape.code == "VSHAPE") return radiator_hose_v_shape;
      if (specifications.shape.code == "JSHAPE") return radiator_hose_j_shape;
      if (specifications.shape.code == "TSHAPE") return radiator_hose_t_shape;
      if (specifications.shape.code == "YSHAPE") return;
      if (specifications.shape.code == "OFFSET") return radiator_hose_offset;
      if (specifications.shape.code == "MULTI_ANGLE")
        return radiator_hose_multi_angle;
      if (specifications.shape.code == "MULTI_BRANCH") return;
      if (specifications.shape.code == "FLEXIBLE")
        return radiator_hose_flexible;
    } catch (error) {}
  }

  if (productid == "basic_fitting") {
    try {
      if (
        specifications.angle.code == "S" &&
        specifications.thread.code == "BSP"
      )
        return bsp_fitting;
      if (
        specifications.angle.code == "45" &&
        specifications.thread.code == "BSP"
      )
        return bsp_45deg_fitting;
      if (
        specifications.angle.code == "90" &&
        specifications.thread.code == "BSP"
      )
        return bsp_90deg_fitting;
      if (
        specifications.angle.code == "S" &&
        specifications.thread.code == "JIC"
      )
        return jic_fitting;
      if (
        specifications.angle.code == "45" &&
        specifications.thread.code == "JIC"
      )
        return jic_45deg_fitting;
      if (
        specifications.angle.code == "90" &&
        specifications.thread.code == "JIC"
      )
        return jic_90deg_fitting;
      return null;
    } catch (error) {
      return null;
    }
  }
  console.log("dddddddd");
  return null;
};
