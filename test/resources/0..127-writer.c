#include <stdio.h>
#include <limits.h>

int main(void) {
    FILE *fp = fopen("0..127.dat", "wb");
    unsigned char c;
    unsigned char content[128];

    if (fp == NULL) {
      printf("Error opening file!\n");
      return 1;
    }

    for(c = 0; c < 128; c++) {
        content[c] = c;
    }

    fwrite(content, sizeof(unsigned char), 128, fp);
    fclose(fp);
}
